interface ContactData {
  company: string;
  address: string;
  phones: string[];
  email: string;
  website: string;
  mapUrl: string;
}

interface Props {
  contact: ContactData;
}

export default function ContactUs({ contact }: Props) {
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
              {contact.company}
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          {/* Address */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Address</p>
            <p className="text-gray-900 font-medium text-base">
              {contact.address}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Phone / Whatsapp
            </p>
            <div className="space-y-1">
              {contact.phones.map((phone, index) => (
                <p key={index} className="text-gray-900 font-medium text-base">
                  {phone}
                </p>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm font-semibold text-gray-700">Email</p>
            <p className="text-gray-900 font-medium text-base break-all">
              {contact.email}
            </p>
          </div>

          {/* Website */}
          <div>
            <p className="text-sm font-semibold text-gray-700">Web</p>
            <p className="text-gray-900 font-medium text-base">
              {contact.website}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Google Maps */}
      <div className="lg:col-span-7 relative overflow-hidden bg-linear-to-br from-cyan-400 to-cyan-600 aspect-video lg:aspect-auto lg:h-full flex items-center justify-center">
        <iframe
          src={contact.mapUrl}
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
