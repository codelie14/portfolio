import { Helmet } from 'react-helmet-async';
import { useLang } from '@/i18n';
import { HOME, OG_IMAGE, SITE_URL, urlFor } from '@/seo/site';

interface SEOProps {
  title?: string;
  description?: string;
  /** chemin de la page, ex. "/" ou "/projects/kami" */
  path?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: object;
}

/** Balises SEO de la page active, dans la langue active (avec alternatives hreflang). */
export default function SEO({ title, description, path = '/', image = OG_IMAGE, type = 'website', noindex, jsonLd }: SEOProps) {
  const { lang } = useLang();
  const t = title ?? HOME[lang].title;
  const d = description ?? HOME[lang].description;
  const url = urlFor(path, lang);

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta name="author" content="Archange Elie Yatte" />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="fr" href={urlFor(path, 'fr')} />
      <link rel="alternate" hrefLang="en" href={urlFor(path, 'en')} />
      <link rel="alternate" hrefLang="x-default" href={urlFor(path, 'fr')} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Archange Elie Yatte" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Archange Elie Yatte" />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'fr' ? 'en_US' : 'fr_FR'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      <link rel="sitemap" type="application/xml" href={`${SITE_URL}/sitemap.xml`} />
    </Helmet>
  );
}
