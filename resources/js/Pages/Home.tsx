import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/section/Layout';
import { Button } from '@/Components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/Components/ui/card';
import { PageProps } from '@/types';

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
  category: {
    name: string;
    slug: string;
  } | null;
}

interface Reason {
  icon: string;
  title: string;
  description: string;
}

interface SectionContent {
  aboutUs?: any;
  visionMission?: any;
  whyChooseUs?: {
    image: string;
    subtitle: string;
    reasons: Reason[];
  };
}

interface HomeProps extends PageProps {
  sections: SectionContent;
  categories: Category[];
  featuredProducts: Product[];
}

export default function Home({
  auth,
  sections,
  categories,
  featuredProducts,
}: HomeProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get reasons from database or use defaults
  const reasons = sections?.whyChooseUs?.reasons || [];

  // Get first featured product for hero section
  const heroProduct = featuredProducts?.[0] || {
    id: 1,
    name: 'Premium Indonesian Products',
    slug: 'products',
    description: 'Discover our premium selection of Indonesian commodities',
    price: null,
  };

  // Get products for display (limit to 3 for homepage)
  const displayProducts = featuredProducts?.slice(0, 3) || [];

  return (
    <Layout title="Home">
      <Head>
        <meta
          name="description"
          content="Modern product showcase platform - simpler than Shopify, more flexible than WordPress"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-indigo-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-500 rounded-full opacity-10 blur-3xl"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500 rounded-full opacity-10 blur-3xl"
            style={{
              transform: `translateY(${-scrollY * 0.3}px)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Hero Content */}
          <div
            className="space-y-8 transition-all duration-1000"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-sm font-medium backdrop-blur-sm">
                ✨ Now Available
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              {heroProduct.name}
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto">
              Premium Quality Indonesian Products
            </p>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {heroProduct.description ||
                'Discover our premium selection of Indonesian vanilla beans, spices, coffee, and more.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-indigo-500/50 transition-all hover:scale-105"
              >
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all hover:scale-105"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            {/* Category tags */}
            {categories && categories.length > 0 && (
              <div className="pt-4">
                <p className="text-gray-400 text-sm mb-3">
                  Explore Our Categories
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hero Product Image */}
          <div className="mt-16 relative">
            <div className="relative mx-auto max-w-5xl">
              {/* Placeholder for product image */}
              <div className="aspect-video rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-8xl">📦</div>
                    <p className="text-gray-500 text-lg">
                      Your Product Showcase Here
                    </p>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-linear-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technology and best practices to give you the
              best experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.length > 0 ? (
              reasons.map((reason, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-green-500 transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
                >
                  <CardHeader>
                    <div className="text-5xl mb-4">{reason.icon}</div>
                    <CardTitle className="text-2xl">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {reason.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No features available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Gallery Teaser */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our carefully curated collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-square bg-linear-to-br from-green-50 to-orange-50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                      {product.category?.name.includes('Vanilla')
                        ? '🌿'
                        : product.category?.name.includes('Coffee')
                          ? '☕'
                          : product.category?.name.includes('Spices')
                            ? '🌶️'
                            : product.category?.name.includes('Coconut')
                              ? '🥥'
                              : product.category?.name.includes('Wood')
                                ? '🪵'
                                : '🎁'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    {product.category && (
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {product.category.name}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      {product.price ? (
                        <span className="text-2xl font-bold text-green-600">
                          ${product.price}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Contact for price
                        </span>
                      )}
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No products available yet
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Specs / Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why We're Different
            </h2>
            <p className="text-xl text-gray-600">
              Compare us with other platforms
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-900 font-semibold">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 text-indigo-600 font-bold text-lg">
                    ShowCommerce
                  </th>
                  <th className="text-center py-4 px-6 text-gray-600">
                    Shopify
                  </th>
                  <th className="text-center py-4 px-6 text-gray-600">
                    WordPress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">Pricing Model</td>
                  <td className="py-4 px-6 text-center text-green-600 font-semibold">
                    One-time payment
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Monthly subscription
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Free (plugins extra)
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">Code Quality</td>
                  <td className="py-4 px-6 text-center text-green-600 font-semibold">
                    Modern (Laravel+React)
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Proprietary
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Legacy PHP
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">Hosting Flexibility</td>
                  <td className="py-4 px-6 text-center text-green-600 font-semibold">
                    Self-host anywhere
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Shopify only
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Self-host
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">Customization</td>
                  <td className="py-4 px-6 text-center text-green-600 font-semibold">
                    Full control
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Limited
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Plugin-dependent
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">Performance</td>
                  <td className="py-4 px-6 text-center text-green-600 font-semibold">
                    Lightning fast
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">Good</td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    Can be slow
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Join hundreds of businesses showcasing their products beautifully
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-xl transition-all hover:scale-105"
            >
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl transition-all hover:scale-105"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                99.9%
              </div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                100%
              </div>
              <div className="text-gray-600">Money Back</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
