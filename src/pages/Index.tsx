import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import IamFlow from '@/components/IamFlow';
import Signature from '@/components/Signature';
import CommandCenter from '@/components/CommandCenter';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { homeGraph } from '@/seo/site';
import { useLang } from '@/i18n';

const Index = () => {
  const { lang } = useLang();
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }), 80);
    return () => clearTimeout(t);
  }, [hash]);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <SEO jsonLd={homeGraph(lang)} />
      <Navigation />
      <main>
        <Hero />
        <Signature />
        <About />
        <Experience />
        <CommandCenter />
        <Projects />
        <IamFlow />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
