import { Search } from 'lucide-react';

export function SearchForm() {
  return (
    <form>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </div>
    </form>
  );
}
