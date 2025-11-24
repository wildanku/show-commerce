import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number | null;
  image: string | null;
  category: {
    name: string;
    slug: string;
  } | null;
}

interface HighlightProps {
  categories: Category[];
  products: Product[];
}

export default function Highlight({ categories, products }: HighlightProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate products for seamless marquee
  const marqueeProducts = [...products, ...products];

  // Calculate grid columns based on category count
  const getGridCols = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      case 5:
        return 'grid-cols-5';
      case 6:
        return 'grid-cols-2 lg:grid-cols-3';
      default:
        return 'md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const gridColsClass = getGridCols(categories.length);

  // Detect if mobile for carousel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, categories.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  // Category gradient backgrounds
  const gradients = [
    'from-amber-600 to-yellow-700',
    'from-red-600 to-orange-700',
    'from-amber-700 to-yellow-800',
    'from-orange-800 to-amber-900',
    'from-green-700 to-emerald-800',
  ];

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-white to-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover premium quality products from Indonesia
          </h2>
        </div>

        {/* Category Carousel */}
        <div className="relative mb-16 md:mb-20">
          {/* Mobile Carousel (< 1024px) */}
          {isMobile ? (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {categories.map((category, idx) => (
                  <div key={category.id} className="min-w-full">
                    <Link
                      href={`/category/${category.slug}`}
                      className="group relative overflow-hidden rounded-xl aspect-square shadow-md hover:shadow-lg transition-all duration-300 block mx-1"
                    >
                      {/* Background with gradient fallback */}
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${
                          gradients[idx % gradients.length]
                        }`}
                      >
                        <img
                          src={category.image ?? '/images/placeholder.jpg'}
                          alt={category.name}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-y-1 transition-transform duration-300 line-clamp-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                          {category.description}
                        </p>
                        <Button
                          variant="outline"
                          className="border-2 border-white hover:bg-white hover:text-gray-900 w-fit transition-all text-black text-xs px-3 py-1"
                        >
                          View
                        </Button>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Mobile Navigation */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Mobile Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {categories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-green-600 w-6'
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Desktop Grid (1024px+) */
            <div className={`grid grid-cols-1 ${gridColsClass} gap-2`}>
              {categories.map((category, idx) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Background with gradient fallback */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${
                      gradients[idx % gradients.length]
                    }`}
                  >
                    <img
                      src={category.image ?? '/images/placeholder.jpg'}
                      alt={category.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:-translate-y-1 transition-transform duration-300 line-clamp-2">
                      {category.name}
                    </h3>
                    {/* <p className="text-gray-200 text-base mb-4 line-clamp-3">
                      {category.description}
                    </p> */}
                    {/* <Button
                      variant="outline"
                      className="border-2 border-white hover:bg-white hover:text-gray-900 w-fit transition-all text-black text-sm px-4 py-2"
                    >
                      View Products
                    </Button> */}
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Featured Products Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Hand-picked products with exceptional quality
          </p>
        </div>

        {/* Marquee Products */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-6 py-4"
            style={{
              animation: isPaused ? 'none' : 'marquee 10s linear infinite',
            }}
          >
            {marqueeProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="shrink-0 w-72"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <Link href={`/products/${product.slug}`}>
                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden bg-linear-to-br from-gray-200 to-gray-300 relative">
                      {/* Placeholder icon since products don't have images yet */}
                      <img src={product.image ?? ''} />

                      {/* Category badge */}
                      {product.category && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                            {product.category.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        {product.price !== null ? (
                          <span className="text-2xl font-bold text-green-600">
                            ${product.price}
                          </span>
                        ) : (
                          <span className="text-lg font-bold text-orange-600">
                            Call For Price
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `,
        }}
      />
    </section>
  );
}
