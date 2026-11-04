import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

export type Lang = 'fr' | 'en';

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LangContext = createContext<Ctx>({ lang: 'fr', setLang: () => {}, toggle: () => {} });

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* stockage indisponible */
  }
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'fr') return q;
  } catch {
    /* ignore */
  }
  return 'fr';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const toggle = useCallback(() => setLang(lang === 'fr' ? 'en' : 'fr'), [lang, setLang]);
  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** tr('Bonjour', 'Hello') → le texte dans la langue active. */
export function useTr() {
  const { lang } = useLang();
  return useCallback(<T,>(fr: T, en: T): T => (lang === 'en' ? en : fr), [lang]);
}
