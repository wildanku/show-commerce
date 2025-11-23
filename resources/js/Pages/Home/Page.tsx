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
  return (
    <Layout title="Home">
      <Head>
        <meta
          name="description"
          content="Premium Indonesian Vanilla Beans, Spices, Coffee, and more - exported worldwide with quality guarantee"
        />
      </Head>
      <Hero />
      <Highlight categories={categories} products={featuredProducts} />
      <AboutUs sections={sections} />
    </Layout>
  );
}
