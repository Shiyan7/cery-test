'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  SortDescriptor,
} from '@nextui-org/react';
import { TableItem } from '@/types/table';
import { DateUtil } from '@/utils/date';
import { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { exactMatch, inRange } from '@/utils/filters';

type Props = {
  items?: TableItem[];
};

const ROWS_PER_PAGE = 25;

const ItemsTable = ({ items = [] }: Props) => {
  const router = useRouter();

  const rawParams = useSearchParams();

  const urlSort = rawParams?.get('sortBy');
  const urlOrder = rawParams?.get('sortOrder');
  const urlPage = rawParams?.get('page');

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: urlSort || 'make',
    direction: (urlOrder as SortDescriptor['direction']) || 'ascending',
  });

  const page = urlPage ? parseInt(urlPage) : 1;

  const filteredItems = useMemo(() => {
    const params = Object.fromEntries(rawParams ? rawParams.entries() : []);

    const { make, model, yearFrom, yearTo, mileageFrom, mileageTo } = params;

    return items.filter(
      (item) =>
        exactMatch(item.make, make) &&
        exactMatch(item.model, model) &&
        inRange(Number(item.year), yearFrom, yearTo) &&
        inRange(item.mileage, mileageFrom, mileageTo)
    );
  }, [items, rawParams]);

  const sortedItems = useMemo(() => {
    const { column, direction } = sortDescriptor;

    return [...filteredItems].sort((a, b) => {
      const aVal = a[column as keyof TableItem];
      const bVal = b[column as keyof TableItem];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'ascending' ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return direction === 'ascending' ? -1 : 1;
      if (aStr > bStr) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sortDescriptor]);

  const totalPages = Math.ceil(sortedItems.length / ROWS_PER_PAGE);

  const paginatedItems = sortedItems.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const handleSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    const newParams = new URLSearchParams(rawParams?.toString());
    newParams.set('sortBy', descriptor.column?.toString() as string);
    newParams.set('sortOrder', descriptor.direction as string);
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(rawParams?.toString());
    if (newPage > 1) {
      newParams.set('page', newPage.toString());
    } else {
      newParams.delete('page');
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <Table
      isHeaderSticky
      layout="fixed"
      bottomContent={
        <>
          {totalPages > 1 && (
            <div className="flex w-full bg-background justify-between items-center sticky -bottom-4 z-1 p-2 rounded-xl">
              <span className="text-sm">1 - 10 of {items?.length}</span>
              <Pagination
                showControls
                color="default"
                total={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
      }
      className="flex-[1_1_0] overflow-auto h-full"
      sortDescriptor={sortDescriptor}
      onSortChange={handleSortChange}
    >
      <TableHeader className="sticky top-0 z-10">
        <TableColumn key="make" allowsSorting>
          Make
        </TableColumn>
        <TableColumn key="model" allowsSorting>
          Model
        </TableColumn>
        <TableColumn key="mileage" allowsSorting className="text-right">
          Mileage
        </TableColumn>
        <TableColumn key="year" allowsSorting className="text-right">
          Year
        </TableColumn>
        <TableColumn key="date_of_update" allowsSorting>
          Last Update
        </TableColumn>
      </TableHeader>
      <TableBody
        className="overflow-auto"
        emptyContent="No rows to display"
        items={paginatedItems}
      >
        {(item) => (
          <TableRow
            key={item.unique_id}
            className="hover:bg-content3 hover:cursor-pointer"
          >
            <TableCell>{item.make}</TableCell>
            <TableCell>{item.model}</TableCell>

            <TableCell className="text-right">{item.mileage} mi</TableCell>
            <TableCell className="text-right min-w-20">{item.year}</TableCell>
            <TableCell className="min-w-32">
              {DateUtil(item.updated_at).format('MM/DD/YYYY HH:mm')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ItemsTable;
