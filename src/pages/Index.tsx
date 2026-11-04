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
import { PersonSchema, WebSiteSchema } from '@/components/StructuredData';

const Index = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }), 80);
    return () => clearTimeout(t);
  }, [hash]);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <SEO />
      <PersonSchema
        name="Archange Elie Yatte"
        jobTitle="Ingénieur Sécurité & Développeur Full-Stack"
        description="Ingénieur Sécurité chez Huawei (GNOC Abidjan) et développeur full-stack. Gestion des accès (IAM), sécurité applicative et plateformes en production avec FastAPI, Django, Next.js et Nuxt."
        url="https://archangeyatte.vercel.app/"
        sameAs={[
          "https://github.com/codelie14",
          "https://linkedin.com/in/archange-yatte",
          "https://facebook.com/codelie14"
        ]}
      />
      <WebSiteSchema
        name="Portfolio - Archange Elie Yatte"
        description="Portfolio de Archange Elie Yatte - Ingénieur Sécurité et Développeur Full-Stack basé en Côte d'Ivoire."
        url="https://archangeyatte.vercel.app/"
        publisher={{
          '@type': 'Person',
          name: 'Archange Elie Yatte'
        }}
      />
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
