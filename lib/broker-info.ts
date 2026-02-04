/**
 * Broker / NWMLS subscriber info for the app.
 * Replace placeholders with your real estate broker details.
 */

export const BROKER_INFO = {
  /** Your name as licensed broker */
  brokerName: "Your Name",
  /** Firm / brokerage name */
  firmName: "Your Firm",
  /** State license number (e.g. WA) */
  licenseNumber: "WA License # XXXXX",
  /** Email for contact */
  email: "your.email@example.com",
  /** Phone (optional) — use string so tel: link and .replace() type-check when empty */
  phone: "" as string,
  /** NWMLS subscriber — set true when you're an NWMLS subscriber */
  nwmlsSubscriber: true,
  /** Short tagline or title (e.g. "Managing Broker", "Realtor®") */
  title: "Realtor®",
} as const;

export const SITE_CONFIG = {
  /** App name used in header and metadata */
  appName: "AFH WABO Prep by DIY",
  /** Full site title for browser tab / SEO */
  siteTitle: "AFH WABO Prep by DIY — Permit Pipeline & Consultant Curriculum",
} as const;
