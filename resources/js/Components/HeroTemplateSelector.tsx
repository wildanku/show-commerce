import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Users,
  Phone,
  Star,
  Zap,
  Clock,
  Shield,
  Info,
} from 'lucide-react';
import { useTranslation } from '@/lib/TranslationContext';

interface HeroTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  preview: string;
  buttonConfig: {
    primary: string;
    primaryAction: string;
    secondary: string;
    secondaryAction: string;
  };
}

const HERO_TEMPLATES: HeroTemplate[] = [
  {
    id: 'two-button',
    name: 'Two Action Buttons',
    description:
      'Clean layout with two main action buttons for browsing services or finding locations',
    icon: <Zap className="w-8 h-8" />,
    preview: 'Browse Services | Find Locations',
    buttonConfig: {
      primary: 'Browse Services',
      primaryAction: 'services',
      secondary: 'Find Locations',
      secondaryAction: 'locations',
    },
  },
  {
    id: 'four-button-grid',
    name: 'Four Action Buttons',
    description:
      'Grid layout with four main action buttons for comprehensive navigation',
    icon: <Users className="w-8 h-8" />,
    preview: 'Services | Doctors | Locations | Contact',
    buttonConfig: {
      primary: 'Find Our Doctors',
      primaryAction: 'doctors',
      secondary: 'Find Locations',
      secondaryAction: 'locations',
    },
  },
  {
    id: 'contact-centric',
    name: 'Contact Focused',
    description: 'Emphasizes direct contact and consultation booking',
    icon: <Phone className="w-8 h-8" />,
    preview: 'Get Consultation | Schedule Now',
    buttonConfig: {
      primary: 'Get Free Consultation',
      primaryAction: 'consultation',
      secondary: 'Schedule Appointment',
      secondaryAction: 'booking',
    },
  },
  {
    id: 'search-prominent',
    name: 'Search Prominent',
    description:
      'Features a search bar for users to find doctors or services directly',
    icon: <Search className="w-8 h-8" />,
    preview: 'Search Doctors or Services',
    buttonConfig: {
      primary: 'Search',
      primaryAction: 'search',
      secondary: 'Browse All',
      secondaryAction: 'browse',
    },
  },
  {
    id: 'stats-sidebar',
    name: 'Stats Showcase',
    description: 'Right sidebar displays key platform statistics and features',
    icon: <Star className="w-8 h-8" />,
    preview: 'With dynamic stats on the right',
    buttonConfig: {
      primary: 'Get Started',
      primaryAction: 'start',
      secondary: 'Learn More',
      secondaryAction: 'learn',
    },
  },
  {
    id: 'centered-minimal',
    name: 'Centered Minimal',
    description: 'Minimalist centered layout with single primary action',
    icon: <Clock className="w-8 h-8" />,
    preview: 'Book Your Appointment Now',
    buttonConfig: {
      primary: 'Book Now',
      primaryAction: 'book',
      secondary: 'Explore',
      secondaryAction: 'explore',
    },
  },
];

interface HeroTemplateSelectorProps {
  onSelectTemplate?: (template: HeroTemplate) => void;
  currentTemplate?: string;
}

export default function HeroTemplateSelector({
  onSelectTemplate,
  currentTemplate,
}: HeroTemplateSelectorProps) {
  const { translate: t } = useTranslation();
  const [selected, setSelected] = useState(currentTemplate || 'two-button');

  const handleSelect = (templateId: string) => {
    setSelected(templateId);
    const template = HERO_TEMPLATES.find((t) => t.id === templateId);
    if (template && onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HERO_TEMPLATES.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelect(template.id)}
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              selected === template.id
                ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
            }`}
          >
            {/* Selection Indicator */}
            {selected === template.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {/* Icon */}
            <div
              className={`mb-4 ${
                selected === template.id ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              {template.icon}
            </div>

            {/* Title */}
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              {template.name}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {template.description}
            </p>

            {/* Preview */}
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-xs font-mono text-gray-700 text-center">
                {template.preview}
              </p>
            </div>

            {/* Button Config */}
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Primary:</span>
                <span className="font-medium text-gray-900">
                  {template.buttonConfig.primary}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Secondary:</span>
                <span className="font-medium text-gray-900">
                  {template.buttonConfig.secondary}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              {t('common.note')}
            </h4>
            <p className="text-sm text-blue-700">
              {t('admin.settings.pages.templateNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
