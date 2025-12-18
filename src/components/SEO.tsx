import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  author?: string;
  type?: string;
  locale?: string;
}

export default function SEO({
  title = 'Archange Elie Yatte | Développeur Full-Stack & Analyste Cybersécurité',
  description = 'Portfolio de Archange Elie Yatte - Développeur Full-Stack et Analyste en Cybersécurité basé en Côte d\'Ivoire. Spécialisé dans le développement d\'applications sécurisées avec Next.js, Node.js, Python et l\'analyse de vulnérabilités.',
  keywords = 'Archange Elie Yatte, développeur, full-stack, cybersécurité, analyste, Côte d\'Ivoire, Next.js, Node.js, Python, sécurité web, pentesting',
  image = '/media/photo-profile.png',
  url = 'https://archangeyatte.vercel.app/',
  author = 'Archange Elie Yatte',
  type = 'website',
  locale = 'fr_FR'
}: SEOProps) {
  const fullTitle = title.includes('Archange Elie Yatte') ? title : `${title} | Archange Elie Yatte`;
  
  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@archangeyatte" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#00d4ff" />
    </Helmet>
  );
}