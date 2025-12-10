import React, { useEffect, useRef, useState } from "react";
import { cn } from "@core/utils/cn";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  [key: string]: unknown;
}

export function DotPattern({
  width = 16,
  height = 16,
  cx = 0.5,
  cy = 0.5,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const cols = Math.ceil(dimensions.width / width);
  const rows = Math.ceil(dimensions.height / height);

  const dots = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: col * width + cx,
      y: row * height + cy,
    };
  });

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      {...props}
    >
      {/* Fondo del patrón */}
      <rect width="100%" height="100%" fill="var(--dotted-bg)" />

      {/* Puntos */}
      {dots.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill="var(--dots)"
        />
      ))}
    </svg>
  );
}
