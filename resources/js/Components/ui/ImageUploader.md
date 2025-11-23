# ImageUploader Component

A reusable image upload component with drag-and-drop functionality, preview, and validation.

## Features

- ✅ **Drag & Drop**: Intuitive drag and drop interface
- ✅ **Click to Upload**: Traditional file picker
- ✅ **Image Preview**: Shows uploaded image preview
- ✅ **File Validation**: Size and type validation
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Remove Functionality**: Easy image removal
- ✅ **TypeScript**: Full type safety

## Usage

### Basic Usage

```tsx
import { ImageUploader } from '@/Components/ui/ImageUploader';

function MyComponent() {
  const [image, setImage] = useState<File | null>(null);

  return (
    <ImageUploader
      value={image}
      onChange={setImage}
      placeholder="Upload your image"
    />
  );
}
```

### With Custom Props

```tsx
<ImageUploader
  value={selectedImage}
  onChange={handleImageChange}
  disabled={isLoading}
  maxSize={10} // 10MB
  accept="image/jpeg,image/png"
  placeholder="Upload product image"
  className="w-full max-w-md"
/>
```

### In Forms (React Hook Form)

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { watch, setValue } = useForm();
  const watchImage = watch('image');

  return (
    <ImageUploader
      value={watchImage}
      onChange={(file) => setValue('image', file)}
      placeholder="Upload profile picture"
    />
  );
}
```

## Props

| Prop          | Type                           | Default                      | Description                 |
| ------------- | ------------------------------ | ---------------------------- | --------------------------- |
| `value`       | `File \| string \| null`       | `null`                       | Current image file or URL   |
| `onChange`    | `(file: File \| null) => void` | -                            | Callback when image changes |
| `disabled`    | `boolean`                      | `false`                      | Disable the uploader        |
| `className`   | `string`                       | -                            | Additional CSS classes      |
| `accept`      | `string`                       | `'image/*'`                  | Accepted file types         |
| `maxSize`     | `number`                       | `5`                          | Maximum file size in MB     |
| `placeholder` | `string`                       | `'Click to upload an image'` | Placeholder text            |

## Examples

### Profile Picture Upload

```tsx
<ImageUploader
  value={profileImage}
  onChange={setProfileImage}
  placeholder="Upload profile picture"
  maxSize={2}
  className="w-32 h-32"
/>
```

### Product Image Upload

```tsx
<ImageUploader
  value={productImage}
  onChange={setProductImage}
  placeholder="Upload product image"
  maxSize={10}
  accept="image/jpeg,image/png,image/webp"
/>
```

### With Validation Error Display

```tsx
function ImageUploadWithValidation() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (file) => {
    setError('');
    if (file && file.size > 5 * 1024 * 1024) {
      setError('File too large');
      return;
    }
    setImage(file);
  };

  return (
    <div>
      <ImageUploader
        value={image}
        onChange={handleImageChange}
        placeholder="Upload image (max 5MB)"
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
```
