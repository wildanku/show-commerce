import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/section/Layout';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number | null;
  image: string | null;
  description: string;
  category: string;
  categorySlug: string | null;
  images: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  features: string[];
}

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  price: number | null;
  image: string | null;
  category: string;
}

interface Props {
  product: Product;
  relatedProducts: RelatedProduct[];
}

export default function ProductDetailPage({ product, relatedProducts }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <Layout title={product.name}>
      {/* <Head>
        <title>{product.name} - ShowCommerce</title>
        <meta name="description" content={product.description} />
      </Head> */}

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/products"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300">
                    <div className="text-8xl">🌿</div>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg transition-all ${
                        selectedImage === index
                          ? 'ring-4 ring-green-600 shadow-lg'
                          : 'ring-2 ring-gray-200 hover:ring-green-400'
                      }`}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-2xl">🌿</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Category Badge */}
              {product.categorySlug && (
                <div className="mb-4">
                  <Link
                    href={`/category/${product.categorySlug}`}
                    className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors"
                  >
                    {product.category}
                  </Link>
                </div>
              )}

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                {product.price !== null ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl md:text-5xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <span className="text-gray-600">per unit</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-orange-600">
                      Call For Price
                    </span>
                    <span className="text-gray-600 text-sm">
                      (Bulk orders available)
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector (only if price exists) */}
              {product.price !== null && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={decrementQuantity}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-16 text-center text-lg font-semibold border-0 focus:outline-none"
                      />
                      <button
                        onClick={incrementQuantity}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                    <span className="text-gray-600">units</span>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* <Button
                  asChild
                  size="lg"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/contact">Request Quote</Link>
                </Button> */}
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg rounded-xl"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-green-600 mb-2">
                    <svg
                      className="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    Premium Quality
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-green-600 mb-2">
                    <svg
                      className="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    Worldwide Shipping
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-green-600 mb-2">
                    <svg
                      className="w-8 h-8 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    Expert Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Features
                </h2>
                <ul className="space-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex gap-3">
                      <svg
                        className="w-6 h-6 text-green-600 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Specifications
                </h2>
                <dl className="space-y-4">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-3 border-b border-gray-200 last:border-0"
                    >
                      <dt className="font-semibold text-gray-900">
                        {spec.label}
                      </dt>
                      <dd className="text-gray-700">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Related Products
              </h2>
              <p className="text-lg text-gray-600">
                You might also be interested in these products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <div className="aspect-square overflow-hidden bg-linear-to-br from-gray-200 to-gray-300 relative">
                      {relatedProduct.image && (
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        🌿
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-green-600 font-semibold mb-2">
                        {relatedProduct.category}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      {relatedProduct.price !== null ? (
                        <span className="text-xl font-bold text-green-600">
                          ${relatedProduct.price}
                        </span>
                      ) : (
                        <span className="text-sm font-bold text-orange-600">
                          Call For Price
                        </span>
                      )}
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
