"use client";

import type { FloorPlanLayout } from "@/lib/floorplan";
import { toIso } from "@/lib/floorplan";

const STROKE = 1.5;
const FONT_SIZE = 12;
const ISO_SCALE = 1; // px per foot in isometric view

export default function FloorPlanIsometric({
  layout,
  className = "",
}: {
  layout: FloorPlanLayout;
  className?: string;
}) {
  const { rooms, pxPerFoot } = layout;

  // Convert layout px to "feet" for iso (so ceiling height makes sense)
  const scaleToFeet = 1 / pxPerFoot;
  const isoScale = pxPerFoot * ISO_SCALE;

  const roomToIso = (r: (typeof layout.rooms)[0]) => {
    const x = r.x * scaleToFeet;
    const y = r.y * scaleToFeet;
    const w = r.w * scaleToFeet;
    const h = r.h * scaleToFeet;
    const z = r.ceilingFt ?? 8;
    const [x0, y0] = toIso(x, y, 0);
    const [x1, y1] = toIso(x + w, y, 0);
    const [x2, y2] = toIso(x + w, y + h, 0);
    const [x3, y3] = toIso(x, y + h, 0);
    const [x0t, y0t] = toIso(x, y, z);
    const [x1t, y1t] = toIso(x + w, y, z);
    const [x2t, y2t] = toIso(x + w, y + h, z);
    const [x3t, y3t] = toIso(x, y + h, z);
    return {
      floor: [x0, y0, x1, y1, x2, y2, x3, y3] as const,
      top: [x0t, y0t, x1t, y1t, x2t, y2t, x3t, y3t] as const,
      leftFace: [x0, y0, x0t, y0t, x3t, y3t, x3, y3] as const,
      rightFace: [x1, y1, x1t, y1t, x2t, y2t, x2, y2] as const,
      backFace: [x3, y3, x3t, y3t, x2t, y2t, x2, y2] as const,
      center: [(x0 + x2) / 2, (y0 + y2) / 2],
      label: r.letter ? `Sleeping ${r.letter}` : r.label,
      isSleeping: r.isSleeping,
    };
  };

  const isoRooms = rooms.map(roomToIso);
  const allX = isoRooms.flatMap((r) => [...r.floor.filter((_, i) => i % 2 === 0), ...r.top.filter((_, i) => i % 2 === 0)]);
  const allY = isoRooms.flatMap((r) => [...r.floor.filter((_, i) => i % 2 === 1), ...r.top.filter((_, i) => i % 2 === 1)]);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  const margin = 30;
  const width = rangeX * isoScale + margin * 2;
  const height = rangeY * isoScale + margin * 2;

  const toPx = (ix: number, iy: number): [number, number] => {
    const px = (ix - minX) * isoScale + margin;
    const py = (iy - minY) * isoScale + margin;
    return [px, py];
  };

  const path = (points: readonly number[]) => {
    let d = `M ${toPx(points[0], points[1]).join(" ")}`;
    for (let i = 2; i < points.length; i += 2) {
      d += ` L ${toPx(points[i], points[i + 1]).join(" ")}`;
    }
    return d + " Z";
  };

  const sorted = [...isoRooms].sort((a, b) => {
    const ca = a.center[0] + a.center[1];
    const cb = b.center[0] + b.center[1];
    return ca - cb;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {sorted.map((r, idx) => (
        <g key={`${r.label}-${idx}`}>
          {/* Floor */}
          <path
            d={path(r.floor)}
            fill={r.isSleeping ? "#1e3a5f" : "#1e293b"}
            stroke="#475569"
            strokeWidth={STROKE}
          />
          {/* Back vertical face */}
          <path
            d={path(r.backFace)}
            fill={r.isSleeping ? "#243b53" : "#334155"}
            stroke="#475569"
            strokeWidth={STROKE}
          />
          {/* Left vertical face */}
          <path
            d={path(r.leftFace)}
            fill={r.isSleeping ? "#2d4a6a" : "#374151"}
            stroke="#475569"
            strokeWidth={STROKE}
          />
          {/* Right vertical face */}
          <path
            d={path(r.rightFace)}
            fill={r.isSleeping ? "#2d4a6a" : "#374151"}
            stroke="#475569"
            strokeWidth={STROKE}
          />
          {/* Top (ceiling) */}
          <path
            d={path(r.top)}
            fill={r.isSleeping ? "#1e3a5f" : "#1e293b"}
            stroke="#64748b"
            strokeWidth={STROKE}
          />
          <text
            x={toPx(r.center[0], r.center[1])[0]}
            y={toPx(r.center[0], r.center[1])[1]}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#e2e8f0"
            fontSize={FONT_SIZE}
            fontWeight={r.isSleeping ? 600 : 400}
          >
            {r.label}
          </text>
        </g>
      ))}

      <text
        x={margin}
        y={height - 8}
        fill="#64748b"
        fontSize={10}
      >
        Isometric — 2D→3D (WABO permit)
      </text>
    </svg>
  );
}
