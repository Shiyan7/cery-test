import ItemsFilter from '@/components/ItemsFilter';
import ItemsTable from '@/components/ItemsTable';
import vehicles from '@/mock/mock_vehicles.json';

export default function AssetsPage() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <ItemsFilter items={vehicles} />
      <ItemsTable items={vehicles} />
    </div>
  );
}
