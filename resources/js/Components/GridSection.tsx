import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

interface GridSectionProps {
  title: string;
  description: string[];
  image: string;
  fallbackIcon?: React.ReactNode;
  buttons?: {
    label: string;
    href: string;
    primary?: boolean;
  }[];
  imagePosition?: 'left' | 'right';
  isDescriptionHTML?: boolean;
}

export default function GridSection({
  title,
  description,
  image,
  fallbackIcon,
  buttons,
  imagePosition = 'right',
  isDescriptionHTML = false,
}: GridSectionProps) {
  const textCol =
    imagePosition === 'right'
      ? 'lg:col-span-7'
      : 'lg:col-span-7 order-2 lg:order-2';
  const imageCol =
    imagePosition === 'right'
      ? 'lg:col-span-5'
      : 'lg:col-span-5 order-1 lg:order-1';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
      {/* Text Content */}
      <div
        className={`${textCol} flex flex-col justify-center p-6 md:p-8 lg:p-10 bg-gray-50 rounded-2xl`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
        <div className="space-y-4 text-gray-600">
          {isDescriptionHTML
            ? description.map((para, index) => (
                <div
                  key={index}
                  className="text-base md:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))
            : description.map((para, index) => (
                <p key={index} className="text-base md:text-lg leading-relaxed">
                  {para}
                </p>
              ))}
        </div>

        {buttons && buttons.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {buttons.map((button, index) => (
              <Button
                key={index}
                asChild
                className={
                  button.primary
                    ? 'bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all'
                    : 'border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-all'
                }
                variant={button.primary ? 'default' : 'outline'}
              >
                <Link href={button.href}>{button.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      <div
        className={`${imageCol} flex items-center justify-center rounded-2xl overflow-hidden bg-gray-200 shadow-lg h-auto lg:h-full`}
      >
        <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center aspect-square lg:aspect-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Fallback icon */}
          {/* {fallbackIcon || (
            <div className="absolute text-8xl">
              <svg
                className="w-24 h-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
