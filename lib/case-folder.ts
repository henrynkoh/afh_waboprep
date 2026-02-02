/**
 * Case folder structure and file naming for AFH pipeline.
 * Matches automation scenario: case folder → file naming → packet assembly.
 */

export const CASE_FOLDER_STRUCTURE = [
  "00_admin",
  "01_sources",
  "02_compliance",
  "03_design",
  "04_3d",
  "05_permit_packet",
  "06_redteam",
  "07_exports",
] as const;

export const ADMIN_FILES = [
  "case_meta.json",
  "entry_mode.csv",
  "assumptions.md",
] as const;

export const COMPLIANCE_FILES = [
  "compliance_report_v1.md",
  "constraints_v1.json",
] as const;

export const DESIGN_FILES = [
  "planA_v1.md",
  "planB_v1.md",
  "planC_v1.md",
  "drawing_package_spec_v1.md",
  "schedules_v1.xlsx",
  "notes_for_inspection_v1.md",
] as const;

export const PERMIT_PACKET_FILES = [
  "A00_Cover_v1.pdf",
  "A01_FloorPlans_v1.pdf",
  "A02_EgressPlan_v1.pdf",
  "A03_Schedules_v1.pdf",
  "S01_Scope_Spec_Estimate_v1.pdf",
  "DSHS_15-604_v1.pdf",
] as const;

export const REDTEAM_FILES = [
  "inspector_questions_v1.md",
  "correction_notice_sim_v1.md",
] as const;

/** Centralia packet document list (for UI / export) */
export const CENTRALIA_PACKET_ITEMS = [
  "Building Permit Application (Centralia form)",
  "Residential Permit Checklist — completed",
  "DSHS AFH Local Building Inspection Checklist 15-604 (Sections 1–4 + 8.5×11 floor plan)",
  "Site Plan (Plot Plan) — 2 paper + 1 PDF",
  "Floor Plans (all floors) — 1/4\"=1' scale, room use, door/window dimensions",
  "Egress Plan / Sleeping Room Classification (A–F, Type S/NS1/NS2)",
  "Door/Window Schedule + bedroom window sill ≤44\" check",
  "Scope of Work + spec + valuation (permit value)",
  "Septic/utility/energy/engineering if applicable",
] as const;

export function getCasePath(caseId: string): string {
  return `/cases/${caseId}`;
}

export function getExportZipName(caseId: string, version: number): string {
  return `Centralia_SubmittalPacket_${caseId}_v${version}.zip`;
}

export function getExportPdfName(caseId: string, version: number): string {
  return `Centralia_SubmittalPacket_${caseId}_v${version}.pdf`;
}
