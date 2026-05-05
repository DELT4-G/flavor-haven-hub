/** Rotating circular text badge */
export function CircleBadge({ text = "Pedir ahora · Pedir ahora · " }: { text?: string }) {
  const chars = text.split("");
  const radius = 52;
  return (
    <div className="relative w-32 h-32 animate-spin-slow">
      <svg viewBox="0 0 140 140" className="w-full h-full">
        <defs>
          <path id="circ" d={`M 70,70 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`} />
        </defs>
        <text fill="currentColor" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="2">
          <textPath href="#circ">{chars.join("")}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-12 h-12 rounded-full bg-cream text-blue grid place-items-center font-display text-sm">VH</div>
      </div>
    </div>
  );
}
