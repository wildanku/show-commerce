import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/section/Layout';
import GridSection from '@/Components/GridSection';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number | null;
  image: string | null;
  description?: string;
}

interface SectionItem {
  title: string;
  description: string;
  image: string | null;
}

interface Section {
  type: 'section' | 'gallery';
  title: string;
  subtitle: string;
  items: SectionItem[];
}

interface ProductCategory {
  title: string;
  slug: string;
  description: string;
  image: string | null;
  sections: Section[];
  created_at: string;
  updated_at: string;
}

interface Props {
  category: ProductCategory;
  products: Product[];
}

export default function ProductCategoryPage({ category, products }: Props) {
  return (
    <Layout title={category.title}>
      {/* <Head>
        <title>{category.title} - ShowCommerce</title>
        <meta name="description" content={category.description} />
      </Head> */}

      {/* Hero Section with Category Image and Title */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {category.image && (
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          {/* Gradient Background Fallback */}
          <div className="absolute inset-0 bg-linear-to-br from-amber-600/10 to-orange-700/20" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {category.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
      {/* Sections */}
      {category.sections.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          className={`py-16 md:py-24 ${
            sectionIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 text-center">
                {section.title}
              </h2>
              {section.subtitle && (
                <h3 className="text-xl md:text-2xl text-gray-700 text-center">
                  {section.subtitle}
                </h3>
              )}
            </div>

            {/* Render based on type */}
            {section.type === 'section' ? (
              // Grid Section Layout
              <div>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-12 last:mb-0">
                    <GridSection
                      title={item.title}
                      description={[item.description]}
                      image={item.image ?? '/images/placeholder.jpg'}
                      imagePosition={itemIndex % 2 === 0 ? 'right' : 'left'}
                      isDescriptionHTML={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // Gallery Layout
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          🖼️
                        </div>
                      )}
                    </div>
                    {/* Image Title Overlay */}
                    {item.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                        <h4 className="text-white font-semibold text-sm md:text-base">
                          {item.title}
                        </h4>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Products Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our {category.title} Products
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Explore our premium selection of {category.title.toLowerCase()}
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <Link href={`/products/${product.slug}`}>
                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden bg-linear-to-br from-gray-200 to-gray-300 relative">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      {/* Fallback icon */}
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        🌿
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                          {category.title}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            /* No Products Message */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Products Yet
              </h3>
              <p className="text-gray-600 mb-8">
                We're currently updating our {category.title.toLowerCase()}{' '}
                collection. Please check back soon!
              </p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          )}

          {/* View All Button */}
          {products.length > 0 && (
            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/contact">Contact Us for Bulk Orders</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-green-600 to-emerald-700 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Interested in Our {category.title}?
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-8">
            Get in touch with us for wholesale pricing, custom orders, and
            shipping information worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-700 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
