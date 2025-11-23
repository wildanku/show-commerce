import { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Components/section/Layout';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number | null;
  description: string;
  image: string | null;
  category: Category | null;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedProducts {
  data: Product[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  links: PaginationLink[];
}

interface Filters {
  search: string;
  category: string;
}

interface Props {
  products: PaginatedProducts;
  categories: Category[];
  filters: Filters;
}

export default function ProductsPage({
  products: initialProducts,
  categories,
  filters,
}: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts.data);
  const [page, setPage] = useState(initialProducts.current_page);
  const [hasMore, setHasMore] = useState(!!initialProducts.next_page_url);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(filters.search);
  const [selectedCategory, setSelectedCategory] = useState(filters.category);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== filters.search || selectedCategory !== filters.category) {
        handleFilterChange();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  const handleFilterChange = () => {
    router.get(
      '/products',
      { search, category: selectedCategory },
      {
        preserveState: true,
        preserveScroll: true,
        only: ['products', 'filters'],
        onSuccess: (page) => {
          const newProducts = page.props.products as PaginatedProducts;
          setProducts(newProducts.data);
          setPage(newProducts.current_page);
          setHasMore(!!newProducts.next_page_url);
        },
      }
    );
  };

  const loadMore = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    router.get(
      '/products',
      { search, category: selectedCategory, page: nextPage },
      {
        preserveState: true,
        preserveScroll: true,
        only: ['products'],
        onSuccess: (response) => {
          const newProducts = response.props.products as PaginatedProducts;
          setProducts((prev) => [...prev, ...newProducts.data]);
          setPage(newProducts.current_page);
          setHasMore(!!newProducts.next_page_url);
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, page]);

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('');
  };

  return (
    <Layout title="All Products">
      <Head>
        <title>All Products - Spices IDN</title>
        <meta
          name="description"
          content="Browse our complete collection of premium Indonesian products"
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-linear-to-r from-green-600 to-emerald-700 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
            Explore our premium selection of Indonesian spices, coffee, vanilla,
            and more
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(search || selectedCategory) && (
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              {products.length > 0 ? (
                <>
                  Showing{' '}
                  <span className="font-semibold">{products.length}</span>{' '}
                  product
                  {products.length !== 1 && 's'}
                </>
              ) : (
                'No products found'
              )}
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
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl">
                          🌿
                        </div>
                      )}

                      {/* Category Badge */}
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
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description.replace(/<[^>]*>/g, '')}
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
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your filters or search term
              </p>
              <Button
                onClick={handleClearFilters}
                className="bg-green-600 hover:bg-green-700"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div ref={observerTarget} className="mt-12 text-center py-8">
              {loading && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600">
                    Loading more products...
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
