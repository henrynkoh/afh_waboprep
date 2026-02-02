"use client";

import type { FloorPlanLayout } from "@/lib/floorplan";

const STROKE = 2;
const FONT_SIZE = 14;
const LABEL_OFFSET = 8;

export default function FloorPlan2D({
  layout,
  showDimensions = true,
  className = "",
}: {
  layout: FloorPlanLayout;
  showDimensions?: boolean;
  className?: string;
}) {
  const { rooms, doors, windows, width, height, pxPerFoot } = layout;
  const pad = 40;
  const vw = width + pad * 2;
  const vh = height + pad * 2;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <filter id="roomShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx={1} dy={1} stdDeviation={1} floodOpacity={0.2} />
        </filter>
      </defs>

      {/* Room rectangles */}
      {rooms.map((r) => (
        <g key={r.id}>
          <rect
            x={r.x + pad}
            y={r.y + pad}
            width={r.w}
            height={r.h}
            fill={r.isSleeping ? "#1e3a5f" : "#1e293b"}
            stroke="#475569"
            strokeWidth={STROKE}
            filter="url(#roomShadow)"
          />
          <text
            x={r.x + pad + r.w / 2}
            y={r.y + pad + r.h / 2 - (r.letter ? FONT_SIZE : FONT_SIZE / 2)}
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize={FONT_SIZE}
            fontWeight={r.isSleeping ? 600 : 400}
          >
            {r.letter ? `Sleeping ${r.letter}` : r.label}
          </text>
          {r.letter && (
            <text
              x={r.x + pad + r.w / 2}
              y={r.y + pad + r.h / 2 + FONT_SIZE}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={12}
            >
              {r.w / pxPerFoot}{"\""} × {r.h / pxPerFoot}{"\""}
            </text>
          )}
          {showDimensions && !r.letter && (
            <text
              x={r.x + pad + r.w / 2}
              y={r.y + pad + r.h / 2 + FONT_SIZE}
              textAnchor="middle"
              fill="#64748b"
              fontSize={11}
            >
              {(r.w / pxPerFoot).toFixed(1)}&apos; × {(r.h / pxPerFoot).toFixed(1)}&apos;
            </text>
          )}
        </g>
      ))}

      {/* Door openings (gap in wall) — draw wall segments around door */}
      {doors.map((d) => {
        const stroke = STROKE + 1;
        if (d.vertical) {
          const room = rooms.find((r) => r.id === d.fromRoom);
          if (!room) return null;
          const wallX = (d as { edgeX?: number }).edgeX !== undefined ? (d as { edgeX: number }).edgeX + pad : d.x + pad;
          const doorY = d.y + pad;
          const doorH = d.width;
          const roomY1 = room.y + pad;
          const roomY2 = room.y + room.h + pad;
          return (
            <g key={d.id}>
              <line x1={wallX} y1={roomY1} x2={wallX} y2={doorY} stroke="#64748b" strokeWidth={stroke} />
              <line x1={wallX} y1={doorY + doorH} x2={wallX} y2={roomY2} stroke="#64748b" strokeWidth={stroke} />
              <rect x={wallX - 3} y={doorY} width={6} height={doorH} fill="#38bdf8" opacity={0.4} />
            </g>
          );
        }
        return null;
      })}

      {/* Windows (on top edge of room) */}
      {windows.map((w) => (
        <rect
          key={w.id}
          x={w.x + pad}
          y={w.y + pad}
          width={w.w}
          height={w.h}
          fill="#0ea5e9"
          stroke={w.egressCandidate ? "#38bdf8" : "#64748b"}
          strokeWidth={w.egressCandidate ? 2 : 1}
          opacity={0.7}
        />
      ))}

      {/* Scale note */}
      <text
        x={pad}
        y={vh - 10}
        fill="#64748b"
        fontSize={10}
      >
        1 sq = 1 ft (scale {pxPerFoot} px/ft)
      </text>
    </svg>
  );
}
