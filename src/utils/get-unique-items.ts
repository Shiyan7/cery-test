type Option = { value: string };

export function getUniqueItems<T>(
  items: T[],
  key: keyof T,
  sortFn?: (a: string, b: string) => number
): Option[] {
  const uniq = Array.from(new Set(items.map((item) => item[key] as string)));
  if (sortFn) uniq.sort(sortFn);
  return uniq.map((value) => ({ value }));
}
