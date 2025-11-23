// Translation loader utility for JSON files
export interface Translation {
  common: {
    login: string;
    logout: string;
    email: string;
    password: string;
    remember: string;
    submit: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    view: string;
    back: string;
    next: string;
    continue: string;
    yes: string;
    no: string;
    previous: string;
    loading: string;
    error: string;
    success: string;
    allRightsReserved: string;
    modernBookingSystem: string;
    welcome: string;
    welcomeBack: string;
    signInToManage: string;
    bookYourAppointment: string;
    chooseService: string;
    alertTitleDelete: string;
    alertSubtitleDelete: string;
    image: string;
    configuration: string;
    option: string;
    action: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    active: string;
    inactive: string;
    clone: string;
    assign: string;
    unassign: string;
    currency: string;
    filter: string;
    reset: string;
    search: string;
    select: string;
  };
  nav: {
    home: string;
    about: string;
    contact: string;
    services: string;
    locations: string;
    bookings: string;
  };
  welcome: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    startFreeTrial: string;
    viewDemo: string;
    featuresTitle: string;
    featuresSubtitle: string;
    smartScheduling: string;
    smartSchedulingDesc: string;
    multiTenant: string;
    multiTenantDesc: string;
    paymentIntegration: string;
    paymentIntegrationDesc: string;
    mobileResponsive: string;
    mobileResponsiveDesc: string;
    easyInstallation: string;
    easyInstallationDesc: string;
    secureReliable: string;
    secureReliableDesc: string;
    ctaTitle: string;
    ctaDescription: string;
    getStartedToday: string;
  };
  booking: {
    selectService: string;
    selectLocation: string;
    selectDateTime: string;
    customerDetails: string;
    paymentMethod: string;
    confirmation: string;
    bookNow: string;
    availableServices: string;
    availableLocations: string;
    duration: string;
    price: string;
    selectThisService: string;
    selectThisLocation: string;
    noServicesAvailable: string;
    noLocationsAvailable: string;
  };
  auth: {
    loginTitle: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    dontHaveAccount: string;
    signUp: string;
    invalidCredentials: string;
  };
  errors: {
    pageNotFound: string;
    serverError: string;
    somethingWentWrong: string;
    goHome: string;
    tryAgain: string;
  };
  wizard: {
    title: string;
    subtitle: string;
    step: string;
    of: string;
    creating: string;
    continue: string;
    previous: string;
    finish: string;
    skip: string;
    step0: {
      title: string;
      subtitle: string;
      selectLanguage: string;
    };
    step1: {
      title: string;
      subtitle: string;
      checking: string;
      phpVersion: string;
      permissions: string;
      extensions: string;
      writableDirectories: string;
      passed: string;
      failed: string;
      required: string;
      current: string;
      allChecksPassed: string;
      someChecksFailed: string;
    };
    step2: {
      title: string;
      subtitle: string;
      host: string;
      port: string;
      name: string;
      username: string;
      password: string;
      testConnection: string;
      testing: string;
      connectionSuccess: string;
      connectionFailed: string;
      runMigrations: string;
      migrationsSuccess: string;
    };
    step3: {
      title: string;
      subtitle: string;
      companyName: string;
      companyEmail: string;
      companyPhone: string;
      companyAddress: string;
      companyCity: string;
      companyCountry: string;
      companyLogo: string;
      favicon: string;
      showLogoEverywhere: string;
      logoUploadText: string;
      logoUploadSubtext: string;
    };
    step4: {
      title: string;
      subtitle: string;
      adminName: string;
      adminEmail: string;
      adminPassword: string;
      confirmPassword: string;
      generatePassword: string;
      passwordGenerated: string;
      passwordsDoNotMatch: string;
      adminCreated: string;
    };
    step5: {
      title: string;
      subtitle: string;
      errors: string;
      smtpSettings: string;
      smtpHost: string;
      smtpPort: string;
      smtpUsername: string;
      smtpPassword: string;
      smtpEncryption: string;
      smtpFromAddress: string;
      smtpFromName: string;
      refundPolicy: string;
      enableRefundPolicy: string;
      refundDescription: string;
      refundType: string;
      refundTypeFull: string;
      refundTypePartial: string;
      refundTypeNone: string;
      refundTypeHint: string;
      maxTimeHours: string;
      maxTimeHoursHint: string;
      feeType: string;
      percentage: string;
      fixedAmount: string;
      feeAmount: string;
      policyText: string;
      reschedulePolicy: string;
      enableReschedulePolicy: string;
      rescheduleDescription: string;
      rescheduleType: string;
      noReschedule: string;
      skipForNow: string;
    };
    step6: {
      title: string;
      subtitle: string;
      congratulations: string;
      nextSteps: string;
      createServices: string;
      addStaff: string;
      customizeSettings: string;
      goToAdmin: string;
      goToWebsite: string;
    };
  };
  admin: {
    sidebar: {
      addNew: string;
      categories: string;
      dashboard: string;
      appointment: string;
      allAppointments: string;
      pending: string;
      confirmed: string;
      completed: string;
      tenant: string;
      allTenant: string;
      services: string;
      allServices: string;
      staff: string;
      allStaff: string;
      customer: string;
      allCustomer: string;
      analytics: string;
      revenue: string;
      popularService: string;
      customerInsight: string;
      settings: string;
      payments: string;
    };
    login: {
      title: string;
      subtitle: string;
    };
    dashboard: {
      title: string;
      subtitle: string;
      totalAppointments: string;
      upcomingAppointments: string;
      completedAppointments: string;
      totalRevenue: string;
      newCustomers: string;
      popularServices: string;
    };
    tenant: {
      title: string;
      subtitle: string;
      basicInfo: string;
      name: string;
      slug: string;
      address: string;
      city: string;
      country: string;
      timezone: string;
      currency: string;
      create: string;
      createTitle: string;
      createSubtitle: string;
      editTitle: string;
      editSubtitle: string;
    };
  };
}

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

// Cache for loaded translations
const translationCache: Record<string, Translation> = {};

export async function loadTranslation(
  languageCode: string
): Promise<Translation> {
  // Return cached translation if available
  if (translationCache[languageCode]) {
    return translationCache[languageCode];
  }

  try {
    // Dynamically import the JSON file
    const translation = await import(`../../lang/${languageCode}.json`);
    translationCache[languageCode] = translation.default;
    return translation.default;
  } catch (error) {
    console.warn(
      `Failed to load translation for ${languageCode}, falling back to English`
    );

    // Fallback to English if the requested language fails to load
    if (languageCode !== 'en') {
      return loadTranslation('en');
    }

    // If even English fails, throw the error
    throw new Error(`Failed to load translation for ${languageCode}: ${error}`);
  }
}

// Helper function to get nested translation value by key path
export function getTranslationValue(
  translation: Translation,
  keyPath: string
): string {
  const keys = keyPath.split('.');
  let value: any = translation;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return keyPath; // Return the key path if not found
    }
  }

  return typeof value === 'string' ? value : keyPath;
}
