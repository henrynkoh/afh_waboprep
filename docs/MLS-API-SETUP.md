# MLS / Listing API Setup

To autofill Entry Mode from a **real MLS number** (address, beds/baths, lot size, etc.), the app needs a listing API. Below are your options and how to plug one in.

---

## Options

| Option | Who it’s for | How you get access |
|--------|----------------|--------------------|
| **RealEstateAPI.com** (Realtor.com data) | Developers, small teams | Sign up, get API key, pay per use or subscription |
| **RESO Web API** | MLS boards, brokers, approved vendors | Your MLS or a RESO-certified vendor provides access |
| **Other MLS/listing APIs** | Varies | Depends on provider (e.g. Zillow, local MLS) |

---

## Option A: RealEstateAPI.com (fastest to try)

1. **Sign up**
   - Go to [RealEstateAPI.com](https://www.realestateapi.com/) or [developer.realestateapi.com](https://developer.realestateapi.com/).
   - Create an account and get an **API key**.

2. **Set environment variable**
   - In the project root, create or edit `.env.local` (never commit this file).
   - Add:
   ```bash
   MLS_API_KEY=your_api_key_here
   ```
   - Optional: set base URL if they give you one, e.g.:
   ```bash
   MLS_API_BASE=https://api.realtor.com/v2
   ```

3. **Restart the dev server**
   - Stop `npm run dev` and run it again so it picks up the new env.

4. **Use Entry Mode**
   - Enter an MLS number in the autofill box and click **Autofill**.  
   - If the key is valid and the MLS number exists in their system, Case Meta (and optionally Site) will fill from the API.

If your provider uses a different endpoint path (e.g. `/properties` or `/listings/search`), edit the `url` in `lib/mls-provider.ts` inside `fetchListingByMlsNumber()`.

**Docs:** [MLS Number Search](https://developer.realestateapi.com/reference/mls-number-search), [Property Search](https://developer.realestateapi.com/reference/property-search-field-guide).

---

## Option B: RESO Web API (MLS board / vendor)

1. **Get access**
   - Through your **MLS** or a **RESO-certified technology vendor**.
   - They provide base URL, auth (e.g. OAuth or API key), and documentation.

2. **Configure the app**
   - Set in `.env.local`:
   ```bash
   MLS_API_KEY=your_reso_api_key_or_token
   MLS_API_BASE=https://your-mls-reso-api.example.com
   ```
   - If your provider uses a different auth scheme (e.g. Bearer token, OAuth client), you may need to add support in `lib/mls-provider.ts` (see “Pluggable provider” below).

3. **Map RESO fields to Entry Mode**
   - RESO uses standard field names (e.g. `ListPrice`, `StreetAddress`, `BedroomsTotal`, `LotSizeSquareFeet`).
   - In `lib/mls-provider.ts`, the `mapResoListingToEntryMode()` (or equivalent) function maps those fields to `CaseMeta` and `SiteRow`. Adjust that mapping to match your MLS’s RESO response.

**Resources:** [RESO Developer Resources](https://reso.org/developer-resources), [RESO Web API](https://www.reso.org/reso-web-api/).

---

## Option C: Another provider (Zillow, local MLS, etc.)

1. Get API base URL and authentication (key, token, or OAuth) from the provider.
2. Add a fetch function in `lib/mls-provider.ts` that:
   - Accepts MLS number or address.
   - Calls the provider’s “listing by MLS number” or “property by address” endpoint.
   - Returns a normalized object that `mapExternalListingToEntryMode()` can turn into `CaseMeta` and `SiteRow`.
3. In `app/api/lookup-property/route.ts`, when `MLS_API_KEY` (or your env var) is set, call this fetch function for MLS/address lookups instead of (or before) the geocode fallback.

---

## What the app expects

- **Env (optional):**
  - `MLS_API_KEY` – If set, the lookup route will try the MLS provider for MLS-number and (if implemented) address lookups.
  - `MLS_API_BASE` – Optional; override the provider’s base URL (e.g. for RealEstateAPI or RESO).
- **Behavior:**
  - User enters MLS number → API route calls the MLS provider; on success, returns `caseMeta` (and optionally `site`, `rooms`) to autofill the form.
  - If no key is set, or the provider returns no listing, the app falls back to “MLS number recorded” (caseId only) or geocoding for address-like input.

---

## Files involved

| File | Role |
|------|------|
| `app/api/lookup-property/route.ts` | Reads `MLS_API_KEY`; for MLS lookups, calls the provider in `lib/mls-provider.ts` and returns the mapped result. |
| `lib/mls-provider.ts` | Fetches listing from external API and maps response → `CaseMeta`, `SiteRow`. Edit this to add or change providers. |
| `.env.local` | Store `MLS_API_KEY` and optionally `MLS_API_BASE`. Not committed to git. |
| `.env.example` | Documents env var names (no real keys). |

---

## Security

- **Never commit API keys.** Use `.env.local` and ensure it’s in `.gitignore`.
- Keep the key on the **server** only: the lookup runs in the Next.js API route, so the key is not exposed to the browser.
