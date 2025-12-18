import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { PersonSchema, WebSiteSchema } from '@/components/StructuredData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO />
      <PersonSchema
        name="Archange Elie Yatte"
        jobTitle="Développeur Full-Stack & Analyste Cybersécurité"
        description="Développeur Full-Stack et Analyste en Cybersécurité basé en Côte d'Ivoire. Spécialisé dans le développement d'applications sécurisées avec Next.js, Node.js, Python et l'analyse de vulnérabilités."
        url="https://archangeyatte.vercel.app/"
        sameAs={[
          "https://github.com/codelie14",
          "https://linkedin.com/in/archange-yatte",
          "https://facebook.com/codelie14"
        ]}
      />
      <WebSiteSchema
        name="Portfolio - Archange Elie Yatte"
        description="Portfolio de Archange Elie Yatte - Développeur Full-Stack et Analyste en Cybersécurité basé en Côte d'Ivoire."
        url="https://archangeyatte.vercel.app/"
        publisher={{
          '@type': 'Person',
          name: 'Archange Elie Yatte'
        }}
      />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
