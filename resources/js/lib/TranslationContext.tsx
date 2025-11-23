import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  Translation,
  loadTranslation,
  getTranslationValue,
} from './translationLoader';

interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: Translation | null;
  isLoading: boolean;
  // Helper function to get translation by key path (e.g., 'common.login')
  translate: (keyPath: string, fallback?: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get language from localStorage or default to 'en'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  const [translation, setTranslation] = useState<Translation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load translation when language changes
  useEffect(() => {
    const loadCurrentTranslation = async () => {
      setIsLoading(true);
      try {
        const loadedTranslation = await loadTranslation(currentLanguage);
        setTranslation(loadedTranslation);
      } catch (error) {
        console.error('Failed to load translation:', error);
        // Try to load English as fallback
        try {
          const fallbackTranslation = await loadTranslation('en');
          setTranslation(fallbackTranslation);
        } catch (fallbackError) {
          console.error('Failed to load fallback translation:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentTranslation();
  }, [currentLanguage]);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  };

  // Helper function to get translation by key path
  const translate = (keyPath: string, fallback?: string): string => {
    if (!translation) {
      return fallback || keyPath;
    }
    return getTranslationValue(translation, keyPath) || fallback || keyPath;
  };

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t: translation,
        isLoading,
        translate,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
