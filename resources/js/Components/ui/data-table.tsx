import React from 'react';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { IPagination } from '@/types/default';
import { Button } from '@/Components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';
import { InputText } from '@/Components/form/input-text';

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableFilter {
  key: string;
  component: React.ReactNode;
}

export interface DataTableProps<T> {
  data: IPagination<T>;
  columns: DataTableColumn<T>[];
  filters?: DataTableFilter[];
  searchable?: boolean;
  searchPlaceholder?: string;
  loading?: boolean;
  onSearchChange?: (query: string) => void;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  filters,
  searchable = true,
  searchPlaceholder = 'Search...',
  loading = false,
  onSearchChange,
  onPageChange,
  className,
}: DataTableProps<T>) {
  const urlParams = new URLSearchParams(window.location.search);
  const currentSearch = urlParams.get('q') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearchChange?.(query);

    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    url.searchParams.set('page', '1');

    router.get(
      url.pathname + url.search,
      {},
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  const handlePageChange = (page: number) => {
    onPageChange?.(page);

    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());

    router.get(
      url.pathname + url.search,
      {},
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  const renderCellValue = (column: DataTableColumn<T>, row: T) => {
    if (column.render) {
      return column.render(row[column.key as keyof T], row);
    }

    const value = row[column.key as keyof T];
    if (value === null || value === undefined) {
      return '-';
    }

    return String(value);
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const currentPage = data.current_page;
    const lastPage = data.last_page;

    // Always show first page
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) {
        pages.push('...');
      }
    }

    // Show pages around current page
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(lastPage, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    // Always show last page
    if (currentPage < lastPage - 2) {
      if (currentPage < lastPage - 3) {
        pages.push('...');
      }
      pages.push(lastPage);
    }

    return pages;
  };

  return (
    <div className={className}>
      {/* Search and Filters */}
      <div className="mb-2 space-y-2 flex justify-between items-start ">
        {filters && filters.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <div key={filter.key} className="flex flex-col gap-2">
                {filter.component}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <InputText
                name="search"
                type="text"
                placeholder={searchPlaceholder}
                value={currentSearch}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={column.className}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={column.className}
                    >
                      {renderCellValue(column, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data.last_page > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            {data.from && data.to ? (
              <>
                Showing {data.from} to {data.to} of{' '}
                {data.last_page * data.per_page} results
              </>
            ) : (
              'No results'
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(data.current_page - 1)}
              disabled={data.current_page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-1">
              {renderPaginationNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-1 text-sm text-gray-500">...</span>
                  ) : (
                    <Button
                      variant={
                        data.current_page === page ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => handlePageChange(page as number)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(data.current_page + 1)}
              disabled={data.current_page === data.last_page}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
