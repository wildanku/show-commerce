import React from 'react';
import Image, { ImageWithSkeleton } from '@/Components/image';

export default function ImageExamples() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Image Component Examples</h1>

      {/* Basic Image with Blur Loading */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Basic Image with Blur Loading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Valid Image</p>
            <Image
              src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300"
              alt="Example image"
              className="w-full h-48 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Invalid Image (will fallback)
            </p>
            <Image
              src="https://invalid-url-that-will-fail.com/image.jpg"
              alt="Invalid image"
              className="w-full h-48 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">No src (will use default)</p>
            <Image alt="No source image" className="w-full h-48 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Skeleton Loading Style */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Skeleton Loading Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">With Skeleton Animation</p>
            <ImageWithSkeleton
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
              alt="Example with skeleton"
              className="w-full h-48 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Custom Skeleton Style</p>
            <ImageWithSkeleton
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300"
              alt="Custom skeleton"
              className="w-full h-48 rounded-lg"
              skeletonClassName="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Circular Avatar</p>
            <ImageWithSkeleton
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200"
              alt="Avatar"
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Different Sizes & Shapes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=150&h=150"
            alt="Small square"
            className="w-full aspect-square rounded-lg"
          />

          <Image
            src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=200"
            alt="Rectangle"
            className="w-full aspect-[3/2] rounded-lg"
          />

          <Image
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=300"
            alt="Portrait"
            className="w-full aspect-[2/3] rounded-lg"
          />

          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100"
            alt="Tiny circle"
            className="w-20 h-20 rounded-full mx-auto"
          />
        </div>
      </div>

      {/* Custom Fallback */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Custom Fallback Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Image
            src="https://invalid-image-url.com/fail.jpg"
            alt="Will use custom fallback"
            fallbackSrc="https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Custom+Fallback"
            className="w-full h-48 rounded-lg"
          />

          <Image
            src="https://another-invalid-url.com/image.png"
            alt="Will use default fallback"
            className="w-full h-48 rounded-lg"
          />
        </div>
      </div>

      {/* Performance Options */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Performance Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Eager Loading (loads immediately)
            </p>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
              alt="Eager loading"
              loading="eager"
              className="w-full h-48 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">No Blur Effect</p>
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300"
              alt="No blur"
              blur={false}
              className="w-full h-48 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
