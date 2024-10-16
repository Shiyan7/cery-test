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
} from '@nextui-org/react';
import { TableItem } from '@/types/table';
import { DateUtil } from '@/utils/date';

type Props = {
  items?: TableItem[];
};

const ItemsTable = ({ items = [] }: Props) => {
  return (
    <Table
      bottomContent={
        <>
          <div className="flex w-full bg-background justify-between items-center sticky -bottom-4 z-1 p-2 rounded-xl">
            <span className="text-sm">1 - 10 of {items?.length}</span>
            <Pagination showControls color="default" total={items.length} />
          </div>
        </>
      }
      className="flex-[1_1_0] overflow-auto h-full"
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
        items={items}
      >
        {items?.map((item) => (
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
        ))}
      </TableBody>
    </Table>
  );
};

export default ItemsTable;
