'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Button,
  SortDescriptor,
} from '@nextui-org/react';
import { TableItem } from '@/types/table';
import { DateUtil } from '@/utils/date';
import { useMemo, useState } from 'react';

type Props = {
  items?: TableItem[];
};

const ROWS_PER_PAGE = 25;

const ItemsTable = ({ items = [] }: Props) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'make',
    direction: 'ascending',
  });

  const [page, setPage] = useState(1);

  const sortedItems = useMemo(() => {
    const { column, direction } = sortDescriptor;

    return [...items].sort((a, b) => {
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
  }, [items, sortDescriptor]);

  const totalPages = Math.ceil(sortedItems.length / ROWS_PER_PAGE);

  const paginatedItems = sortedItems.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  return (
    <Table
      isHeaderSticky
      layout="fixed"
      bottomContent={
        <>
          <div className="flex w-full bg-background justify-between items-center sticky -bottom-4 z-1 p-2 rounded-xl">
            <span className="text-sm">1 - 10 of {items?.length}</span>
            <Pagination
              showControls
              color="default"
              total={totalPages}
              page={page}
              onChange={setPage}
            />
          </div>
        </>
      }
      className="flex-[1_1_0] overflow-auto h-full"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
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
