import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import ContactUs from './ContactUs';
import GridSection from '@/Components/GridSection';

interface Reason {
  icon: string;
  title: string;
  description: string;
}

interface SectionContent {
  aboutUs?: {
    image: string;
    title: string;
    subtitle: string;
    description: string;
    cta: Array<{
      label: string;
      type: string;
      url: string;
    }>;
  };
  whyChooseUs?: {
    image: string;
    subtitle: string;
    reasons: Reason[];
  };
}

interface AboutUsProps {
  sections: SectionContent;
}

export default function AboutUs({ sections }: AboutUsProps) {
  // Parse about us description HTML to array of paragraphs
  const aboutUsDescription = sections?.aboutUs?.description
    ? sections.aboutUs.description
        .split('</p>')
        .filter((p) => p.trim())
        .map((p) =>
          p
            .replace(/<\/?p>/g, '')
            .replace(/<\/?strong>/g, '')
            .trim()
        )
    : [
        'Spicesidn C.V. was officially established in December 2019. Our company is engaged in the export of Vanilla Beans and Indonesian Spices Distributors.',
        'We are here to help and support companies/individuals in the field of differentiating Vanilla Beans and Indonesian spices.',
        'With the times and increasingly fierce competition, we will continue to innovate to provide the best solutions for all the needs of our business partners.',
      ];

  const aboutUsButtons = sections?.aboutUs?.cta || [
    { label: 'Learn More', url: '/about-us', type: 'primary' },
    { label: 'Contact Us', url: '/contact', type: 'outline' },
  ];

  const whyChooseUsReasons = sections?.whyChooseUs?.reasons || [];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Section - About Us */}
        <GridSection
          title={sections?.aboutUs?.title || 'About Us'}
          description={aboutUsDescription}
          image={sections?.aboutUs?.image || '/images/about-1.jpg'}
          imagePosition="right"
          buttons={aboutUsButtons.map((btn) => ({
            label: btn.label,
            href: btn.url,
            primary: btn.type === 'primary',
          }))}
        />

        {/* Second Section - Why Choose Us */}
        {whyChooseUsReasons.length > 0 && (
          <div className="mt-16 md:mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Image - Left Side */}
              <div className="lg:col-span-5 flex items-center justify-center rounded-2xl overflow-hidden bg-gray-200 shadow-lg h-auto lg:h-full">
                <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center aspect-square lg:aspect-auto">
                  <img
                    src={sections?.whyChooseUs?.image || '/images/about-2.jpg'}
                    alt="Why Choose Us"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Fallback icon */}
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
                </div>
              </div>

              {/* Content - Right Side */}
              <div className="lg:col-span-7 flex flex-col justify-center p-6 md:p-8 lg:p-10 bg-gray-50 rounded-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Why Choose Us
                </h2>
                <div className="space-y-5">
                  {whyChooseUsReasons.map((reason, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white text-xl">
                          {reason.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-gray-600">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Us Section */}
        <ContactUs />
      </div>
    </section>
  );
}
