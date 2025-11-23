import { Plus, Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface ImageInputProps {
  onImageUpload: (file: File | null) => void;
  error?: string;
  help?: string;
  defaultValue?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  onImageUpload,
  error,
  help,
  defaultValue,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
    }
  }, [defaultValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    } else {
      setPreview(null);
      onImageUpload(null);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
    // Clear the input field
    (document.getElementById('imageInput') as HTMLInputElement).value = '';
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center">
        <label
          htmlFor="imageInput"
          className="flex hover:bg-gray-100 flex-col items-center justify-center w-full h-auto aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
        >
          {preview ? (
            <img
              src={preview}
              alt="Selected preview"
              className="object-cover w-full h-auto aspect-square rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Plus size={40} className="text-gray-500" />
              <p className="text-gray-500 text-sm">Click to upload an image</p>
            </div>
          )}
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      {preview && (
        <div className="absolute top-0 right-2">
          <button
            onClick={handleRemoveImage}
            className="mt-2 text-sm text-red-600 hover:underline bg-red-50 hover:bg-red-200 h-8 w-8 rounded-full items-center flex justify-center"
          >
            <Trash size={20} />
          </button>
        </div>
      )}
      {!!error && (
        <span className="block mt-1 text-xs text-red-600">{error}</span>
      )}
      {!!help && <span className="block mt-1 text-xs italic">{help}</span>}
    </div>
  );
};

export default ImageInput;
