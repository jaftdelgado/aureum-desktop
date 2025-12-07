export function createEnumGuard<T extends string>(validValues: readonly T[]) {
  return (value: string): value is T => validValues.includes(value as T);
}
