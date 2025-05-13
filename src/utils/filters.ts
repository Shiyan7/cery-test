export const inRange = (
  value: number,
  min?: string | null,
  max?: string | null
) => {
  const numMin = min ? parseInt(min) : -Infinity;
  const numMax = max ? parseInt(max) : Infinity;
  return value >= numMin && value <= numMax;
};

export const exactMatch = (value: string, filter?: string | null) =>
  !filter || value === filter;
