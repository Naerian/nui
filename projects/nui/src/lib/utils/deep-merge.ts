/**
 * Realiza un merge profundo de dos objetos.
 * Ideal para combinar configuraciones por defecto con overrides.
 */
export function deepMerge<T>(base: T, override: Partial<T> | undefined): T {
  if (!override) return base;

  const result = { ...base } as any;

  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      const overrideValue = override[key];
      const baseValue = base[key];

      if (
        overrideValue !== null &&
        typeof overrideValue === 'object' &&
        !Array.isArray(overrideValue) &&
        baseValue !== null &&
        typeof baseValue === 'object' &&
        !Array.isArray(baseValue)
      ) {
        result[key] = deepMerge(baseValue, overrideValue);
      } else if (overrideValue !== undefined) {
        result[key] = overrideValue;
      }
    }
  }

  return result as T;
}
