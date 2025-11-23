export default function ContactUs() {
  return (
    <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-2xl shadow-xl">
      {/* Left Side - Contact Information */}
      <div className="lg:col-span-5 bg-linear-to-br from-orange-50 to-yellow-50 p-8 md:p-12 lg:p-14 flex flex-col justify-center">
        {/* Header with accent line */}
        <div className="mb-10 flex items-center gap-4">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Contact
            </h3>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Information
            </h3>
            <p className="text-sm text-gray-600 mt-2 font-semibold">
              SPICESIDM CV.
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          {/* Address */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Address</p>
            <p className="text-gray-900 font-medium text-base">
              Trevista Hills Kebayoran D23 Kota Depok, Jakarta Indonesia
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Phone / Whatsapp
            </p>
            <div className="space-y-1">
              <p className="text-gray-900 font-medium text-base">
                +62 82338386226
              </p>
              <p className="text-gray-900 font-medium text-base">
                +62 82243533405
              </p>
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm font-semibold text-gray-700 ">Email</p>
            <p className="text-gray-900 font-medium text-base break-all">
              info@spicesidm.com
            </p>
          </div>

          {/* Website */}
          <div>
            <p className="text-sm font-semibold text-gray-700">Web</p>
            <p className="text-gray-900 font-medium text-base">
              www.spicesidm.com
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Google Maps */}
      <div className="lg:col-span-7 relative overflow-hidden bg-linear-to-br from-cyan-400 to-cyan-600 aspect-video lg:aspect-auto lg:h-full flex items-center justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7930.355681839907!2d106.7451943!3d-6.3710265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5007bccab19%3A0x1a17ad69d1489864!2sSPICESIDN%20CV!5e0!3m2!1sid!2sid!4v1763455928102!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}
