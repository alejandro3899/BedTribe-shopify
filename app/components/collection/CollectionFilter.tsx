import filter from '~/assets/filter.svg';

export default function CollectionFilter({
  available,
}: {
  available: string | null;
}) {
  return (
    <div className="flex items-center">
      <span>Filter</span>
      <div className="p-1 rounded-full bg-cream">
        <img src={filter} className="w-3 h-3" />
      </div>
    </div>
  );
}
