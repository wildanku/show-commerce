# Select Components

This directory contains two select components that work similarly to react-select:

- `Select` - For static options with optional search functionality
- `SelectAsync` - For dynamic options loaded asynchronously

## Features

Both components include:

- ✅ Default value support
- ✅ Controlled and uncontrolled modes
- ✅ Optional search functionality
- ✅ Clearable option
- ✅ Custom value/label extractors
- ✅ Keyboard navigation (Arrow keys, Escape)
- ✅ Click outside to close
- ✅ Loading states (SelectAsync)
- ✅ Consistent UI design
- ✅ TypeScript support

## Select Component

Use this for static options that don't require server-side fetching.

```tsx
import { Select } from './Components/form/select';

const MyComponent = () => {
  const [value, setValue] = useState(null);

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <Select
      name="my-select"
      value={value}
      onChange={(value, option) => setValue(value)}
      options={options}
      placeholder="Choose an option..."
      isSearchable={true} // Enable/disable search
      isClearable={true} // Show clear button
    />
  );
};
```

### Props

| Prop               | Type                                              | Default              | Description                           |
| ------------------ | ------------------------------------------------- | -------------------- | ------------------------------------- |
| `name`             | `string`                                          | Required             | Form field name                       |
| `value`            | `any`                                             | Required             | Current selected value                |
| `onChange`         | `(value: any, option?: Option) => void`           | Required             | Change handler                        |
| `options`          | `Option[]`                                        | Required             | Array of options                      |
| `defaultValue`     | `any`                                             | -                    | Initial value (for uncontrolled mode) |
| `valueOption`      | `(option: Option) => any`                         | `(opt) => opt.value` | Extract value from option             |
| `labelOption`      | `(option: Option) => string`                      | `(opt) => opt.label` | Extract label from option             |
| `isSearchable`     | `boolean`                                         | `true`               | Enable search functionality           |
| `isClearable`      | `boolean`                                         | `false`              | Show clear button                     |
| `placeholder`      | `string`                                          | -                    | Input placeholder                     |
| `disabled`         | `boolean`                                         | `false`              | Disable the input                     |
| `className`        | `string`                                          | -                    | Custom CSS classes                    |
| `noOptionsMessage` | `string \| (inputValue: string) => string`        | `'No options'`       | Message when no options               |
| `filterOption`     | `(option: Option, inputValue: string) => boolean` | Built-in filter      | Custom filter function                |

## SelectAsync Component

Use this for options that need to be loaded asynchronously (e.g., from an API).

```tsx
import { SelectAsync } from './Components/form/select-async';

const MyComponent = () => {
  const [value, setValue] = useState(null);

  const fetchUsers = async (query: string) => {
    const response = await fetch(`/api/users?search=${query}`);
    return response.json();
  };

  return (
    <SelectAsync
      name="user-select"
      value={value}
      onChange={(value, option) => setValue(value)}
      fetchOptions={fetchUsers}
      placeholder="Search for users..."
      loadingMessage="Loading users..."
      noOptionsMessage="No users found"
    />
  );
};
```

### Props

Same as Select component, but with these differences:

| Prop             | Type                                       | Default        | Description                    |
| ---------------- | ------------------------------------------ | -------------- | ------------------------------ |
| `fetchOptions`   | `(query: string) => Promise<Option[]>`     | Required       | Async function to load options |
| `loadingMessage` | `string \| (inputValue: string) => string` | `'Loading...'` | Message during loading         |

## Advanced Usage

### Custom Value/Label Extractors

```tsx
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

<Select
  options={users}
  valueOption={(user) => user.id}
  labelOption={(user) => `${user.name} (${user.email})`}
  // ... other props
/>;
```

### Non-searchable Select

```tsx
<Select
  isSearchable={false}
  // ... other props
/>
```

### With Default Value

```tsx
// Uncontrolled with default
<Select
  defaultValue="2"
  value={undefined}
  // ... other props
/>;

// Controlled with initial value
const [value, setValue] = useState('2');
<Select
  value={value}
  // ... other props
/>;
```

### Custom Filtering

```tsx
<Select
  filterOption={(option, inputValue) => {
    // Custom search logic
    return (
      option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.email.toLowerCase().includes(inputValue.toLowerCase())
    );
  }}
  // ... other props
/>
```

## Styling

Both components use Tailwind CSS classes. The main input uses the `InputText` component's styling. You can customize the appearance by:

1. Passing a custom `className` prop
2. Modifying the default classes in the component files
3. Using CSS to override specific elements

The components maintain a consistent look with:

- Indigo focus colors
- Gray borders and text
- Rounded corners
- Drop shadows for dropdowns
- Hover effects

## Notes

- Both components handle keyboard navigation (Arrow keys, Escape)
- Click outside to close dropdown
- Proper TypeScript support with generic Option types
- Performance optimized with proper useEffect dependencies
- Accessibility-friendly markup and keyboard support
