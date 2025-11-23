import { Head } from '@inertiajs/react';
import Layout from '@/Components/section/Layout';
import { useEffect } from 'react';

interface AboutUsSection {
  title: string;
  subtitle: string;
  image: string;
  content?: string[];
  vision?: {
    title: string;
    icon: string;
    description: string;
  };
  mission?: {
    title: string;
    icon: string;
    items: string[];
  };
  legal_documents?: {
    label: string;
    value: string;
    date?: string;
  }[];
}

interface AboutUs {
  title: string;
  subtitle: string;
  hero_image: string;
  sections: AboutUsSection[];
}

interface Props {
  aboutUs: AboutUs;
}

export default function AboutUsPage({ aboutUs }: Props) {
  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAA_YSlU7icWhwM12C9jLTFqdFYA4miBBMEPApguNc2bzXoS8DHOnGdmKCs07HPWjUU8qBaeCf2O7W4SVo&components=hosted-buttons&disable-funding=venmo&currency=USD';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      // Render PayPal button after SDK loads
      if ((window as any).paypal) {
        (window as any).paypal
          .HostedButtons({
            hostedButtonId: 'D86A3J6G54G7E',
          })
          .render('#paypal-container-D86A3J6G54G7E');
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on component unmount if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  return (
    <Layout title={aboutUs.title}>
      {/* <Head>
        <title>{aboutUs.title} - ShowCommerce</title>
        <meta
          name="description"
          content={`Learn more about ${aboutUs.subtitle}`}
        />
      </Head> */}

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[350px] overflow-hidden">
        {/* Orange Diagonal Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-20" />
        {/* Background Image */}
        <img
          src={aboutUs.hero_image}
          alt={aboutUs.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="flex items-start gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-2">
                    {aboutUs.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-100">
                    {aboutUs.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      {aboutUs.sections.map((section, index) => (
        <section
          key={index}
          className={`py-12 md:py-16 lg:py-20 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* About Us Section */}
            {section.content && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-base md:text-lg text-gray-700 leading-relaxed text-justify"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-8xl">🏢</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vision & Mission Section */}
            {section.vision && section.mission && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-8xl">📊</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-1 h-16 md:h-20 bg-orange-600 shrink-0" />
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                        {section.title}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-600">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{section.vision.icon}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {section.vision.title}
                      </h3>
                    </div>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify pl-12">
                      {section.vision.description}
                    </p>
                  </div>

                  {/* Mission */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{section.mission.icon}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {section.mission.title}
                      </h3>
                    </div>
                    <div className="space-y-3 pl-12">
                      {section.mission.items.map((item, mIndex) => (
                        <p
                          key={mIndex}
                          className="text-base md:text-lg text-gray-700 leading-relaxed text-justify"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legal Documents Section */}
            {section.legal_documents && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-start gap-4 mb-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                        {section.title}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-600">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {section.legal_documents.map((doc, dIndex) => (
                      <div
                        key={dIndex}
                        className="border-l-4 border-orange-600 pl-6 py-2"
                      >
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                          {doc.label} {doc.date && `:`}
                        </h4>
                        {doc.date && (
                          <p className="text-base text-gray-600 mb-1">
                            {doc.date}
                          </p>
                        )}
                        <p className="text-base md:text-lg text-gray-700">
                          {doc.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-8xl">⚖️</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* PayPal Section */}
      {/* <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Support Us
            </h2>
            <p className="text-lg text-gray-600">
              Help us continue to provide quality products and services
            </p>
          </div>

          <div className="flex justify-center w-full">
            <div className="w-full" id="paypal-container-D86A3J6G54G7E" />
          </div>
        </div>
      </section> */}
    </Layout>
  );
}
