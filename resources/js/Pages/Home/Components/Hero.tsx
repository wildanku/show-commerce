import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

export default function Hero() {
  return (
    <section className="relative w-full aspect-3/4 md:aspect-16/5 bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpeg"
          alt="Premium Indonesian Spices"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 md:bg-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white md:text-black  mb-4">
            Pure Indonesian Spices, Delivered Worldwide
          </h1>

          {/* Description */}
          <p className="text-white md:text-black text-base sm:text-lg md:text-xl leading-relaxed mb-8">
            Bringing you the finest Vanilla Beans & authentic Indonesian spices
            with world-class quality and reliable export service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base md:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/products">Explore Our Product</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2  text-black hover:bg-white/20 px-8 py-3 text-base md:text-lg rounded-lg font-semibold transition-all"
            >
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
