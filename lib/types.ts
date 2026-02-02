/** Entry Mode — Case Meta */
export interface CaseMeta {
  caseId: string;
  address: string;
  county: "Lewis" | "Thurston" | "Pierce";
  city: string;
  parcelApn?: string;
  listingUrl?: string;
  asIsBedBath: string;
  targetAfhBeds: number;
  targetResidentMix: string;
  scopeType: string;
  assumedCodeBasis: string;
}

/** Room row for Levels & Rooms */
export interface RoomRow {
  level: string;
  roomId: string;
  roomName: string;
  useAsIs: string;
  useToBe: string;
  interiorW: string;
  interiorL: string;
  ceilingH: string;
  notes?: string;
}

/** Door row */
export interface DoorRow {
  doorId: string;
  fromRoom: string;
  toRoom: string;
  doorType: string;
  clearWidthIn: string;
  swing: string;
  thresholdIn: string;
  lock: string;
  notes?: string;
}

/** Window row (egress critical) */
export interface WindowRow {
  windowId: string;
  roomId: string;
  windowType: string;
  roughWIn: string;
  roughHIn: string;
  sillHeightIn: string;
  operable: string;
  egressCandidate: string;
  notes?: string;
}

/** Stairs / ramps / thresholds */
export interface StairRampRow {
  elementId: string;
  type: string;
  location: string;
  riseIn: string;
  runIn: string;
  widthIn: string;
  landing: string;
  notes?: string;
}

/** Site / exterior */
export interface SiteRow {
  lotSize: string;
  setbacksKnown: string;
  drivewayParking: string;
  utilities: string;
  existingAdditionsSheds: string;
}

/** Life-safety items (display only) */
export interface LifeSafetyRow {
  item: string;
  location: string;
  qty: string;
  notes?: string;
}

export type County = "Lewis" | "Thurston" | "Pierce";
