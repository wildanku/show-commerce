import { Tenant, Service } from '@/types/booking';
import { formatCurrency } from '@/lib/utils';

interface SplitStartProps {
  tenants: Tenant[];
  services: Service[];
  onSelectTenant: (tenantId: number) => void;
  onSelectService: (serviceId: number) => void;
}

export default function SplitStart({
  tenants,
  services,
  onSelectTenant,
  onSelectService,
}: SplitStartProps) {
  return (
    <div className="text-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Book Your Appointment
        </h1>
        <p className="text-lg text-gray-600">
          How would you like to start your booking?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Choose a Place First */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Choose a Place
            </h2>
            <p className="text-gray-600 mb-6">
              Select your preferred location first
            </p>
          </div>

          <div className="space-y-3">
            {tenants.map((tenant) => (
              <button
                key={tenant.id}
                onClick={() => onSelectTenant(tenant.id)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <div className="font-medium text-gray-900">{tenant.name}</div>
                <div className="text-sm text-gray-500">
                  View available services
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Choose a Service First */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Choose a Service
            </h2>
            <p className="text-gray-600 mb-6">Browse all available services</p>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {services.slice(0, 4).map((service) => (
              <button
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {service.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {service.duration} min
                    </div>
                    {service.is_online && (
                      <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                        Online
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(service.price)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
            {services.length > 4 && (
              <div className="text-center text-sm text-gray-500 py-2">
                +{services.length - 4} more services available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
