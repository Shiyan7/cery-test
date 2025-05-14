'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
} from '@nextui-org/react';
import { TableItem } from '@/types/table';
import { DateUtil } from '@/utils/date';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { exactMatch, inRange } from '@/utils/filters';
import { usePagination } from '@/hooks/usePagination';
import { useSortedItems } from '@/hooks/useSortedItems';

type Props = {
  items?: TableItem[];
};

const TABLE_COLUMNS = [
  { key: 'make', label: 'Make' },
  { key: 'model', label: 'Model' },
  { key: 'mileage', label: 'Mileage' },
  { key: 'year', label: 'Year' },
  { key: 'date_of_update', label: 'Last Update' },
];

const ItemsTable = ({ items = [] }: Props) => {
  const rawParams = useSearchParams();

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

  const { sortDescriptor, onSortChange, sortedItems } = useSortedItems(filteredItems);

  const { page, totalPages, paginatedItems, onPageChange } = usePagination(sortedItems);

  return (
    <Table
      isHeaderSticky
      layout="fixed"
      aria-label="Table"
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
                onChange={onPageChange}
              />
            </div>
          )}
        </>
      }
      className="flex-[1_1_0] overflow-auto h-full"
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    >
      <TableHeader className="sticky top-0 z-10">
        {TABLE_COLUMNS.map((column) => (
          <TableColumn
            key={column.key}
            allowsSorting
            className={
              ['mileage', 'year'].includes(column.key) ? 'text-right' : ''
            }
          >
            {column.label}
          </TableColumn>
        ))}
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
