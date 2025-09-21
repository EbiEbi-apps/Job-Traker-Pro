import React, { createContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { translations, Language, TranslationKey } from '../translations';

// Helper type to get the specific return type for a given translation key.
type TranslationValue<K extends TranslationKey> = (typeof translations)['en'][K];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // FIX: Made `t` generic to return the correct type for the given translation key.
  // This resolves the error where `t` was incorrectly typed to only return `string`.
  t: <K extends TranslationKey>(key: K) => TranslationValue<K>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');
  
  const t = useCallback(<K extends TranslationKey>(key: K): TranslationValue<K> => {
    // The cast is necessary because TypeScript can't guarantee `translations[language]` has the same shape as `translations['en']`.
    return (translations[language]?.[key] || translations['en'][key]) as TranslationValue<K>;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
