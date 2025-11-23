import { ReactNode, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from '../../lib/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from '@/Components/logo';
import Footer from './Footer';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

interface PageProps extends InertiaPageProps {
  productCategories: ProductCategory[];
}

export default function Layout({ children, title }: LayoutProps) {
  const { t, isLoading, translate } = useTranslation();
  const { productCategories } = usePage<PageProps>().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  // Show loading state while translations are being loaded
  if (isLoading || !t) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{title ? `${title} - Spices IDN` : 'Spices IDN'}</title>
        <meta name="description" content="" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Logo className="h-16" alt="SpiceIDN logo" />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Home
                </Link>

                {/* Products Dropdown */}
                <div className="relative group">
                  <button className="text-gray-700 hover:text-green-600 font-medium transition-colors flex items-center gap-1">
                    Products
                    <svg
                      className="w-4 h-4 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors font-semibold border-b border-gray-200"
                    >
                      All Products
                    </Link>
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/about-us"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Contact
                </Link>
              </nav>

              {/* Contact Info & Mobile Menu Button */}
              <div className="flex items-center gap-4">
                {/* Contact Info - Hidden on mobile */}
                <div className="hidden lg:block">
                  <small className="block mb-0 text-right text-gray-600">
                    Call Us
                  </small>
                  <div className="flex gap-2 items-center -mt-1">
                    <img
                      src="/images/wa.png"
                      alt="WhatsApp"
                      className="w-5 h-5"
                    />
                    <a
                      href="https://wa.me/6282338386226"
                      className="hover:underline text-sm"
                    >
                      +62 823-3838-6226
                    </a>
                  </div>
                </div>

                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-gray-600 hover:text-gray-900 p-2"
                >
                  {mobileMenuOpen ? (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 py-4">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>

                  {/* Mobile Products Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="w-full px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>Products</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          mobileProductsOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {mobileProductsOpen && (
                      <div className="ml-4 mt-2 flex flex-col gap-1">
                        <Link
                          href="/products"
                          className="px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors text-sm font-semibold"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProductsOpen(false);
                          }}
                        >
                          All Products
                        </Link>
                        {productCategories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors text-sm"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProductsOpen(false);
                            }}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/about-us"
                    className="px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/contact"
                    className="px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>

                  {/* Mobile Contact Info */}
                  <div className="px-4 py-3 mt-2 border-t border-gray-200">
                    <small className="block mb-1 text-gray-600">Call Us</small>
                    <div className="flex gap-2 items-center">
                      <img
                        src="/images/wa.png"
                        alt="WhatsApp"
                        className="w-5 h-5"
                      />
                      <a
                        href="https://wa.me/6282338386226"
                        className="hover:underline text-sm text-green-600"
                      >
                        +62 823-3838-6226
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
