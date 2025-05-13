'use client';

import { TableItem } from '@/types/table';
import { getUniqueItems } from '@/utils/get-unique-items';
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  items?: TableItem[];
};

const ItemsFilter = ({ items = [] }: Props) => {
  const rawParams = useSearchParams();

  const router = useRouter();

  const unique = useMemo(
    () => ({
      makes: getUniqueItems(items, 'make', (a, b) => a.localeCompare(b)),
      models: getUniqueItems(items, 'model', (a, b) => a.localeCompare(b)),
      years: getUniqueItems(items, 'year', (a, b) => Number(a) - Number(b)),
    }),
    [items]
  );

  const handleFilterChange = (name: string, value: string | null) => {
    const newParams = new URLSearchParams(rawParams?.toString());

    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }

    newParams.delete('page');
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      <Autocomplete
        placeholder="Search a make"
        label="Make"
        defaultSelectedKey={rawParams?.get('make') || undefined}
        defaultItems={unique.makes}
        onSelectionChange={(value) =>
          handleFilterChange('make', value as string)
        }
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        placeholder="Search a model"
        label="Model"
        defaultSelectedKey={rawParams?.get('model') || undefined}
        defaultItems={unique.models}
        onSelectionChange={(value) =>
          handleFilterChange('model', value as string)
        }
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
        )}
      </Autocomplete>
      <Select
        defaultSelectedKeys={[rawParams?.get('yearFrom') || '']}
        onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
        placeholder="Search a year from"
        label="Year From"
      >
        {unique.years.map((item) => (
          <SelectItem key={item.value}>{item.value}</SelectItem>
        ))}
      </Select>
      <Select
        defaultSelectedKeys={[rawParams?.get('yearTo') || '']}
        onChange={(e) => handleFilterChange('yearTo', e.target.value)}
        placeholder="Search a year to"
        label="Year To"
      >
        {unique.years.map((item) => (
          <SelectItem key={item.value}>{item.value}</SelectItem>
        ))}
      </Select>
      <Input
        label="Mileage From"
        type="number"
        min={0}
        placeholder="Enter mileage from"
        defaultValue={rawParams?.get('mileageFrom') || ''}
        onChange={(e) => handleFilterChange('mileageFrom', e.target.value)}
      />
      <Input
        label="Mileage To"
        type="number"
        min={0}
        placeholder="Enter mileage to"
        defaultValue={rawParams?.get('mileageTo') || ''}
        onChange={(e) => handleFilterChange('mileageTo', e.target.value)}
      />
    </div>
  );
};

export default ItemsFilter;
