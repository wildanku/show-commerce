import Layout from '@/Components/section/Layout';
import { Head } from '@inertiajs/react';
import Hero from './Components/Hero';
import Highlight from './Components/Hightlight';
import AboutUs from './Components/AboutUs';
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
  image: string | null;
  category: {
    name: string;
    slug: string;
  } | null;
}

interface SectionContent {
  aboutUs?: any;
  visionMission?: any;
  whyChooseUs?: any;
}

interface HomeProps extends PageProps {
  sections: SectionContent;
  categories: Category[];
  featuredProducts: Product[];
}

export default function Homepage({
  sections,
  categories,
  featuredProducts,
}: HomeProps) {
  // Extract text from HTML description for meta tags
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const aboutUsDescription = sections.aboutUs
    ? stripHtml(sections.aboutUs.description).substring(0, 160)
    : 'Premium Indonesian Vanilla Beans, Spices, Coffee, and more - exported worldwide with quality guarantee';

  return (
    <Layout title="Home">
      <Head>
        <meta name="description" content={aboutUsDescription} />
        <meta
          name="keywords"
          content="Indonesian spices, vanilla beans, coffee, premium exports, Indonesian products, spice exporter"
        />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Premium Indonesian Spices & Vanilla Beans | Spices IDN"
        />
        <meta property="og:description" content={aboutUsDescription} />
        <meta
          property="og:image"
          content={
            sections.aboutUs?.image ||
            'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200'
          }
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Spices IDN" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Premium Indonesian Spices & Vanilla Beans | Spices IDN"
        />
        <meta name="twitter:description" content={aboutUsDescription} />
        <meta
          name="twitter:image"
          content={
            sections.aboutUs?.image ||
            'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200'
          }
        />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Spices IDN" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href.split('?')[0]} />
      </Head>
      <Hero />
      <Highlight categories={categories} products={featuredProducts} />
      <AboutUs sections={sections} />
    </Layout>
  );
}
