# DataTable Component Usage Guide

## Overview

The `DataTable` component is a reusable table component that provides:

- Search functionality
- Filtering capabilities
- Pagination with URL state management
- Custom column rendering
- Loading states
- Responsive design

## Basic Usage

```tsx
import { DataTable, DataTableColumn } from '@/Components/ui/DataTable';

const columns: DataTableColumn<YourDataType>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    render: (value, row) => (
      <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
        {value}
      </a>
    ),
  },
];

<DataTable
  data={paginatedData}
  columns={columns}
  loading={isLoading}
  searchable={true}
  searchPlaceholder="Search users..."
/>;
```

## Column Configuration

Each column can have the following properties:

- `key`: The property key from your data object
- `label`: Display name for the column header
- `sortable`: Whether the column can be sorted (UI only - implement sorting logic separately)
- `render`: Custom render function for the cell content
- `className`: Additional CSS classes for the column

## Filter Configuration

```tsx
const filters: DataTableFilter[] = [
  {
    key: 'status',
    label: 'Status',
    component: (
      <Select
        options={statusOptions}
        onChange={handleStatusFilter}
        placeholder="All Statuses"
      />
    ),
  },
];
```

## URL State Management

The component automatically manages URL parameters for:

- `page`: Current page number
- `q`: Search query
- Custom filter parameters

## React Query Integration

Use with React Query hooks for optimal data fetching:

```tsx
const { data, isLoading } = useQuery({
  queryKey: ['data', filters, page, search],
  queryFn: () => fetchData({ page, search, ...filters }),
});
```

## Features

✅ **Search**: Built-in search functionality with URL state  
✅ **Pagination**: Full pagination with page numbers and navigation  
✅ **Filters**: Extensible filter system  
✅ **Loading States**: Built-in loading indicators  
✅ **Responsive**: Mobile-friendly design  
✅ **Customizable**: Flexible column rendering and styling  
✅ **URL State**: Browser back/forward support  
✅ **TypeScript**: Full type safety
