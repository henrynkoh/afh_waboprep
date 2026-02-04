import { NextRequest, NextResponse } from "next/server";
import { fetchListingByMlsNumber } from "@/lib/mls-provider";
import type { CaseMeta, RoomRow, SiteRow } from "@/lib/types";

/** County type for response */
type County = "Lewis" | "Thurston" | "Pierce";

/** Known demo / mock data for Centralia 2606 Cooks Hill */
const MOCK_CASE: CaseMeta = {
  caseId: "centralia_2606_cooks_hill_rd",
  address: "2606 Cooks Hill Rd, Centralia, WA 98531",
  county: "Lewis",
  city: "Centralia",
  parcelApn: "",
  listingUrl: "",
  asIsBedBath: "3/2",
  targetAfhBeds: 6,
  targetResidentMix: "ambulatory / limited mobility",
  scopeType: "garage conversion / interior remodel / addition",
  assumedCodeBasis: "IRC + local amendments + WAC",
};

const MOCK_SITE: SiteRow = {
  lotSize: "7,500 sqft",
  setbacksKnown: "yes/no",
  drivewayParking: "2-car + street",
  utilities: "sewer/water",
  existingAdditionsSheds: "yes/no",
};

const MOCK_ROOMS: RoomRow[] = [
  { level: "1F", roomId: "R101", roomName: "Living", useAsIs: "Living", useToBe: "Common", interiorW: "12-0", interiorL: "16-0", ceilingH: "8-0", notes: "" },
  { level: "1F", roomId: "B101", roomName: "Bedroom 1", useAsIs: "Bed", useToBe: "Sleeping A", interiorW: "10-0", interiorL: "10-0", ceilingH: "8-0", notes: "80 sqft+" },
  { level: "2F", roomId: "B201", roomName: "Bedroom 2", useAsIs: "Bed", useToBe: "Sleeping B", interiorW: "9-0", interiorL: "10-0", ceilingH: "8-0", notes: "" },
  { level: "1F", roomId: "K101", roomName: "Kitchen", useAsIs: "Kitchen", useToBe: "Kitchen", interiorW: "10-0", interiorL: "12-0", ceilingH: "8-0", notes: "" },
];

/** City → county for WA (Lewis, Thurston, Pierce) */
const CITY_TO_COUNTY: Record<string, County> = {
  centralia: "Lewis",
  chehalis: "Lewis",
  olympia: "Thurston",
  lacey: "Thurston",
  tumwater: "Thurston",
  tacoma: "Pierce",
  pierce: "Pierce",
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_,-]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "") || "property";
}

/** Check if query matches the known demo property (address or MLS-style id) */
function isDemoProperty(q: string): boolean {
  const lower = q.toLowerCase().trim();
  return (
    (lower.includes("2606") && lower.includes("cooks")) ||
    lower.includes("centralia_2606") ||
    lower === "2606 cooks hill rd, centralia, wa 98531" ||
    lower === "2606 cooks hill"
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json(
      { error: "Missing query. Use ?q=MLS_NUMBER or ?q=ADDRESS" },
      { status: 400 }
    );
  }

  // 1) Known demo property → return full mock data
  if (isDemoProperty(q)) {
    return NextResponse.json({
      caseMeta: MOCK_CASE,
      site: MOCK_SITE,
      rooms: MOCK_ROOMS,
    });
  }

  // 2) MLS-only (numeric/alphanumeric, no address-like content) → try MLS API if configured
  const looksLikeMlsOnly = /^[a-z0-9_-]+$/i.test(q) && !/\d+\s+\w+/.test(q) && q.length < 20;
  if (looksLikeMlsOnly) {
    const mlsResult = await fetchListingByMlsNumber(q);
    if (mlsResult) {
      return NextResponse.json({
        caseMeta: mlsResult.caseMeta,
        site: mlsResult.site,
        rooms: undefined,
      });
    }
    return NextResponse.json({
      caseMeta: {
        caseId: slugify(q) || q,
      },
      message:
        "MLS number recorded. No listing data for this MLS—enter address and details manually, or set MLS_API_KEY (see docs/MLS-API-SETUP.md).",
    });
  }

  // 3) Try OpenStreetMap Nominatim for address-like query → partial Case Meta (address, city, county if inferrable)
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=1`,
      { headers: { "User-Agent": "AFH-WABO-Prep/1.0" } }
    );
    if (!res.ok) throw new Error("Geocode failed");
    const data = (await res.json()) as Array<{
      display_name?: string;
      address?: {
        city?: string;
        town?: string;
        village?: string;
        county?: string;
        state?: string;
        postcode?: string;
        road?: string;
        house_number?: string;
      };
    }>;
    const first = data?.[0];
    if (!first?.address) {
      return NextResponse.json(
        { error: "No property found for this MLS number or address." },
        { status: 404 }
      );
    }
    const addr = first.address;
    const city = addr.city ?? addr.town ?? addr.village ?? "";
    const state = addr.state ?? "";
    const cityKey = city.toLowerCase().replace(/\s+/g, "");
    const county: County | undefined = addr.county
      ? (CITY_TO_COUNTY[addr.county.toLowerCase().replace(/\s+/g, "")] ?? CITY_TO_COUNTY[cityKey])
      : CITY_TO_COUNTY[cityKey];
    const street = [addr.house_number, addr.road].filter(Boolean).join(" ");
    const fullAddress =
      [street, city, state, addr.postcode].filter(Boolean).join(", ") ||
      first.display_name ||
      q;
    const caseId = slugify(q);

    const caseMeta: Partial<CaseMeta> = {
      caseId: caseId || "property",
      address: fullAddress,
      city: city || "",
      county: county ?? "Lewis",
      assumedCodeBasis: "IRC + local amendments + WAC",
    };

    return NextResponse.json({
      caseMeta,
      site: undefined,
      rooms: undefined,
    });
  } catch {
    return NextResponse.json(
      { error: "No property found for this MLS number or address." },
      { status: 404 }
    );
  }
}
