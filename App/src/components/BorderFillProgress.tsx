export default function BorderFillProgress({
  percent = 0,
  width = 270,
  height = 70,
  radius = 28,
  strokeWidth = 3,
  color = '#c084fc',
}) {
  const strokeW = width - strokeWidth;
  const strokeH = height - strokeWidth;
  const strokeR = Math.max(0, radius - strokeWidth / 2);
  const perimeter = 2 * (strokeW - 2 * strokeR) + 2 * (strokeH - 2 * strokeR) + 2 * Math.PI * strokeR;
  const adjustedOffset = perimeter * (1 - percent / 100);

  // Estilos compartidos para optimización
  const transition = "stroke-dashoffset 0.1s linear";

  const finalOffset = percent > 98 ? 0 : adjustedOffset;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', willChange: 'stroke-dashoffset' }}
    >
      {/* 1. Capa de "Glow" (Neón): Trazo más grueso y semi-transparente */}
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={strokeW}
        height={strokeH}
        rx={strokeR}
        ry={strokeR}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 2.5} 
        strokeOpacity={0.3}
        strokeLinecap="round"
        strokeDasharray={`${perimeter} ${perimeter}`}
        strokeDashoffset={finalOffset}
        style={{ transition }}
      />

      {/* 2. Capa principal (Núcleo): Trazo fino y sólido */}
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={strokeW}
        height={strokeH}
        rx={strokeR}
        ry={strokeR}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${perimeter} ${perimeter}`}
        strokeDashoffset={finalOffset}
        style={{ transition }}
      />
    </svg>
  );
}