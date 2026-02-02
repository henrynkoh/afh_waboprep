/**
 * 2D floor plan layout and isometric projection from Entry Mode data.
 * Scale: pxPerFoot (e.g. 20). Rooms placed in rows by level; doors/windows positioned on edges.
 */

import type { RoomRow, DoorRow, WindowRow } from "./types";

/** Parse "12-0" (ft-in) or "10" to feet. */
export function parseFtIn(str: string): number {
  if (!str || str === "-") return 0;
  const parts = String(str).trim().split("-").map((p) => parseInt(p, 10) || 0);
  const feet = parts[0] ?? 0;
  const inches = (parts[1] ?? 0) / 12;
  return feet + inches;
}

export interface LayoutRoom {
  id: string;
  level: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  useToBe: string;
  isSleeping: boolean;
  letter: string; // A–F for sleeping rooms
  ceilingFt: number;
}

export interface LayoutDoor {
  id: string;
  fromRoom: string;
  toRoom: string;
  x: number;
  y: number;
  width: number; // px (clear opening)
  vertical: boolean;
  edgeX: number; // wall/edge x position (for drawing)
}

export interface LayoutWindow {
  id: string;
  roomId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  sillIn: number;
  egressCandidate: boolean;
}

export interface FloorPlanLayout {
  rooms: LayoutRoom[];
  doors: LayoutDoor[];
  windows: LayoutWindow[];
  width: number;
  height: number;
  pxPerFoot: number;
  gap: number;
}

const SLEEPING_LETTERS = ["A", "B", "C", "D", "E", "F"];

export function getLayout(
  rooms: RoomRow[],
  doors: DoorRow[],
  windows: WindowRow[],
  options: { pxPerFoot?: number; gap?: number } = {}
): FloorPlanLayout {
  const pxPerFoot = options.pxPerFoot ?? 20;
  const gap = options.gap ?? 10;

  const byLevel = new Map<string, RoomRow[]>();
  for (const r of rooms) {
    const level = r.level || "1F";
    if (!byLevel.has(level)) byLevel.set(level, []);
    byLevel.get(level)!.push(r);
  }
  const levels = Array.from(byLevel.keys()).sort();

  const layoutRooms: LayoutRoom[] = [];
  let totalWidth = 0;
  let totalHeight = 0;
  const levelYStart: Record<string, number> = {};
  const roomIndexByLevel: Record<string, number> = {};
  let sleepingIndex = 0;

  for (const level of levels) {
    const levelRooms = byLevel.get(level)!;
    levelYStart[level] = totalHeight;
    let x = 0;
    let maxH = 0;

    for (let i = 0; i < levelRooms.length; i++) {
      const r = levelRooms[i];
      const wFt = parseFtIn(r.interiorW) || 10;
      const lFt = parseFtIn(r.interiorL) || 10;
      const ceilingFt = parseFtIn(r.ceilingH) || 8;
      const w = wFt * pxPerFoot;
      const h = lFt * pxPerFoot;
      const isSleeping =
        /sleeping|bed/i.test(r.useToBe) || /bed/i.test(r.useAsIs);
      const letter = isSleeping
        ? SLEEPING_LETTERS[sleepingIndex++ % 6]
        : "";

      layoutRooms.push({
        id: r.roomId,
        level,
        x,
        y: levelYStart[level],
        w,
        h,
        label: r.roomName || r.roomId,
        useToBe: r.useToBe,
        isSleeping,
        letter,
        ceilingFt,
      });

      roomIndexByLevel[`${level}:${i}`] = layoutRooms.length - 1;
      x += w + gap;
      maxH = Math.max(maxH, h);
    }

    totalWidth = Math.max(totalWidth, x - gap);
    totalHeight = levelYStart[level] + maxH + gap;
  }

  const roomById = new Map(layoutRooms.map((r) => [r.id, r]));
  const layoutDoors: LayoutDoor[] = [];

  for (const d of doors) {
    const from = roomById.get(d.fromRoom);
    const to = d.toRoom === "Exterior" ? null : roomById.get(d.toRoom);
    const widthIn = parseInt(d.clearWidthIn, 10) || 36;
    const widthPx = (widthIn / 12) * pxPerFoot;

    if (from) {
      if (to && from.level === to.level) {
        const idxFrom = layoutRooms.findIndex((x) => x.id === from.id);
        const idxTo = layoutRooms.findIndex((x) => x.id === to.id);
        const adjacent =
          Math.abs(idxFrom - idxTo) === 1 &&
          layoutRooms[idxFrom]?.level === layoutRooms[idxTo]?.level;
        if (adjacent) {
          const left = idxFrom < idxTo ? from : to;
          const right = idxFrom < idxTo ? to : from;
          const edgeX = left.x + left.w;
          const y = left.y + left.h / 2 - widthPx / 2;
          layoutDoors.push({
            id: d.doorId,
            fromRoom: d.fromRoom,
            toRoom: d.toRoom,
            x: edgeX,
            y,
            width: widthPx,
            vertical: true,
            edgeX,
          });
        }
      } else if (!to) {
        const edgeX = from.x + from.w;
        const x = edgeX - widthPx;
        const y = from.y + from.h / 2 - widthPx / 2;
        layoutDoors.push({
          id: d.doorId,
          fromRoom: d.fromRoom,
          toRoom: d.toRoom,
          x,
          y,
          width: widthPx,
          vertical: true,
          edgeX,
        });
      }
    }
  }

  const layoutWindows: LayoutWindow[] = [];
  for (const w of windows) {
    const room = roomById.get(w.roomId);
    if (!room) continue;
    const roughW = parseInt(w.roughWIn, 10) || 36;
    const roughH = parseInt(w.roughHIn, 10) || 36;
    const sillIn = parseInt(w.sillHeightIn, 10) || 0;
    const wPx = (roughW / 12) * pxPerFoot;
    const hPx = Math.min(8, (roughH / 12) * pxPerFoot * 0.3);
    layoutWindows.push({
      id: w.windowId,
      roomId: w.roomId,
      x: room.x + room.w / 2 - wPx / 2,
      y: room.y,
      w: wPx,
      h: hPx,
      sillIn,
      egressCandidate: /yes|true/i.test(w.egressCandidate),
    });
  }

  return {
    rooms: layoutRooms,
    doors: layoutDoors,
    windows: layoutWindows,
    width: totalWidth,
    height: totalHeight,
    pxPerFoot,
    gap,
  };
}

/** Isometric: 2D (x,y) to iso screen (x_iso, y_iso). z=0 for floor. */
export function toIso(x: number, y: number, z: number): [number, number] {
  const cos30 = Math.sqrt(3) / 2;
  const sin30 = 0.5;
  const x_iso = (x - y) * cos30;
  const y_iso = (x + y) * sin30 - z;
  return [x_iso, y_iso];
}

/** Scale iso coords to pixel (e.g. 1 unit = 10 px). */
export function isoToPx(isoX: number, isoY: number, scale: number, originX: number, originY: number): [number, number] {
  return [originX + isoX * scale, originY + isoY * scale];
}
