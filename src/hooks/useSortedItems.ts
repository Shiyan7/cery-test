import { SortDescriptor } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export function useSortedItems<T>(items: T[]) {
  const router = useRouter();

  const rawParams = useSearchParams();

  const urlSort = rawParams?.get('sortBy');

  const urlOrder = rawParams?.get('sortOrder');

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: urlSort || 'make',
    direction: (urlOrder as SortDescriptor['direction']) || 'ascending',
  });

  const sortedItems = useMemo(() => {
    const { column, direction } = sortDescriptor;

    return [...items].sort((a, b) => {
      const aVal = a[column as keyof T];
      const bVal = b[column as keyof T];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'ascending' ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return direction === 'ascending' ? -1 : 1;
      if (aStr > bStr) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [items, sortDescriptor]);

  const onSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    const newParams = new URLSearchParams(rawParams?.toString());
    newParams.set('sortBy', descriptor.column?.toString() as string);
    newParams.set('sortOrder', descriptor.direction as string);
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return {
    sortDescriptor,
    sortedItems,
    onSortChange,
  };
}
