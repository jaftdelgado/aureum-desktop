export function calculatePercentDiff(
  currentPrice: number,
  basePrice: number
): number | null {
  if (!basePrice || basePrice <= 0) return null;
  return (currentPrice / basePrice - 1) * 100;
}

export function formatPercent(percent: number | null): string | null {
  if (percent === null) return null;
  const sign = percent >= 0 ? "+" : "";
  return `${sign}${percent.toFixed(2)}%`;
}

export function isPositive(percent: number | null): boolean {
  return percent !== null && percent >= 0;
}
