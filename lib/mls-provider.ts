/**
 * MLS / listing API integration.
 * Set MLS_API_KEY (and optionally MLS_API_BASE) in .env.local to enable.
 * See docs/MLS-API-SETUP.md for setup steps.
 */

import type { CaseMeta, SiteRow } from "@/lib/types";

type County = "Lewis" | "Thurston" | "Pierce";

const COUNTIES: County[] = ["Lewis", "Thurston", "Pierce"];

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

/** Generic listing shape from external APIs (RealEstateAPI, RESO, etc.) */
export interface ExternalListing {
  mlsNumber?: string;
  listingId?: string;
  address?: string;
  streetAddress?: string;
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  county?: string;
  bedrooms?: number;
  bathrooms?: number;
  lotSize?: number;
  lotSizeSquareFeet?: number;
  listingUrl?: string;
  parcelNumber?: string;
  [key: string]: unknown;
}

function toCounty(city?: string, county?: string): County {
  if (county) {
    const key = county.toLowerCase().replace(/\s+/g, "");
    if (COUNTIES.includes(key as County)) return key as County;
    const fromCity = CITY_TO_COUNTY[key];
    if (fromCity) return fromCity;
  }
  if (city) {
    const key = city.toLowerCase().replace(/\s+/g, "");
    const c = CITY_TO_COUNTY[key];
    if (c) return c;
  }
  return "Lewis";
}

function buildAddress(listing: ExternalListing): string {
  if (listing.address && String(listing.address).trim()) return String(listing.address).trim();
  const parts = [
    [listing.streetNumber, listing.streetName].filter(Boolean).join(" "),
    listing.streetAddress,
    listing.city,
    listing.state,
    listing.postalCode,
  ].filter(Boolean);
  return parts.join(", ") || "";
}

/**
 * Map an external API listing response to Entry Mode CaseMeta and SiteRow.
 * Override or extend this when your API uses different field names.
 */
export function mapExternalListingToEntryMode(
  listing: ExternalListing,
  mlsQuery: string
): { caseMeta: Partial<CaseMeta>; site?: Partial<SiteRow> } {
  const address = buildAddress(listing);
  const city = (listing.city ?? "").toString().trim();
  const county = toCounty(city, listing.county?.toString());
  const beds = listing.bedrooms ?? 0;
  const baths = listing.bathrooms ?? 0;
  const bedBath = beds && baths ? `${beds}/${baths}` : "";
  const lotSqFt = listing.lotSizeSquareFeet ?? listing.lotSize;

  const caseMeta: Partial<CaseMeta> = {
    caseId: (listing.mlsNumber ?? mlsQuery).toString().replace(/\s+/g, "_"),
    address: address || mlsQuery,
    city,
    county,
    parcelApn: listing.parcelNumber?.toString(),
    listingUrl: listing.listingUrl?.toString(),
    asIsBedBath: bedBath,
    assumedCodeBasis: "IRC + local amendments + WAC",
  };

  let site: Partial<SiteRow> | undefined;
  if (lotSqFt != null && lotSqFt > 0) {
    site = {
      lotSize: `${Number(lotSqFt).toLocaleString()} sqft`,
    };
  }

  return { caseMeta, site };
}

/**
 * Fetch listing by MLS number from the configured provider.
 * Returns null if MLS_API_KEY is not set or the provider returns no listing.
 */
export async function fetchListingByMlsNumber(
  mlsNumber: string
): Promise<{ caseMeta: Partial<CaseMeta>; site?: Partial<SiteRow> } | null> {
  const apiKey = process.env.MLS_API_KEY;
  const base = (process.env.MLS_API_BASE || "https://api.realtor.com/v2").replace(/\/$/, "");

  if (!apiKey?.trim()) return null;

  try {
    // RealEstateAPI-style: GET /listings with mlsNumber query (adjust path/params to your provider)
    const url = `${base}/listings?mlsNumber=${encodeURIComponent(mlsNumber)}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as
      | { data?: ExternalListing; listing?: ExternalListing; listings?: ExternalListing[] }
      | ExternalListing;

    const listing: ExternalListing | undefined =
      "data" in data && data.data
        ? data.data
        : "listing" in data && data.listing
          ? data.listing
          : "listings" in data && Array.isArray(data.listings) && data.listings[0]
            ? data.listings[0]
            : typeof data === "object" && data !== null && ("address" in data || "city" in data || "mlsNumber" in data)
              ? (data as ExternalListing)
              : undefined;

    if (!listing) return null;

    return mapExternalListingToEntryMode(listing, mlsNumber);
  } catch {
    return null;
  }
}
