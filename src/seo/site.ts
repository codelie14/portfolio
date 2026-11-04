// Source unique des informations SEO : utilisée par l'application (React)
// et par le script de pré-rendu exécuté au build (scripts/prerender.mjs).
import { projects } from '../data/index';
import { projectsEn } from '../data/en-data';

export type Lang = 'fr' | 'en';
export const SITE_URL = 'https://archangeyatte.vercel.app';
export const OG_IMAGE = `${SITE_URL}/media/og-image.jpg`;
export const PERSON_ID = `${SITE_URL}/#person`;

export const SAME_AS = [
  'https://github.com/codelie14',
  'https://github.com/Indra-Labs-dev',
  'https://linkedin.com/in/archange-yatte',
  'https://facebook.com/codelie14',
];

export const HOME = {
  fr: {
    title: 'Archange Elie Yatte — Ingénieur Sécurité & Développeur Full-Stack à Abidjan',
    description:
      "Ingénieur Sécurité chez Huawei (GNOC Abidjan) et développeur full-stack. Gestion des accès (IAM), sécurité applicative et plateformes en production : IndraWatch, CyberGram, GateKeeper.",
  },
  en: {
    title: 'Archange Elie Yatte — Security Engineer & Full-Stack Developer in Abidjan',
    description:
      'Security Engineer at Huawei (GNOC Abidjan) and full-stack developer. Identity & access management (IAM), application security and production platforms: IndraWatch, CyberGram, GateKeeper.',
  },
};

export const KNOWS_ABOUT = [
  'Identity and Access Management (IAM)',
  'Privileged Access Management',
  'Application Security',
  'OWASP Top 10',
  'Network Security',
  'Penetration Testing',
  'Python',
  'FastAPI',
  'Django',
  'TypeScript',
  'React',
  'Next.js',
  'Nuxt',
  'PostgreSQL',
  'Docker',
];

export function urlFor(path: string, lang: Lang) {
  const base = SITE_URL + (path === '/' ? '/' : path);
  return lang === 'en' ? `${base}?lang=en` : base;
}

export function localizedProjects(lang: Lang) {
  return lang === 'fr' ? projects : projects.map((p) => ({ ...p, ...(projectsEn[p.id] ?? {}) }));
}

export function abs(src: string) {
  return src.startsWith('http') ? src : SITE_URL + src;
}

function personNode(lang: Lang) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Archange Elie Yatte',
    givenName: 'Archange Elie',
    familyName: 'Yatte',
    alternateName: ['Navanime', 'codelie14'],
    jobTitle: lang === 'fr' ? 'Ingénieur Sécurité' : 'Security Engineer',
    description: HOME[lang].description,
    url: SITE_URL + '/',
    image: `${SITE_URL}/media/photo-profile.webp`,
    email: 'mailto:archangeyatte@gmail.com',
    telephone: '+2250575925880',
    address: { '@type': 'PostalAddress', addressLocality: 'Abidjan', addressCountry: 'CI' },
    nationality: { '@type': 'Country', name: "Côte d'Ivoire" },
    worksFor: { '@type': 'Organization', name: 'Huawei Technologies', url: 'https://www.huawei.com' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: "Université Virtuelle de Côte d'Ivoire" },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name:
        lang === 'fr'
          ? 'Licence Informatique et Sciences du Numérique — Réseaux et Sécurité Informatique'
          : "Bachelor's in Computer Science — Networks and Information Security",
    },
    knowsLanguage: ['fr', 'en'],
    knowsAbout: KNOWS_ABOUT,
    sameAs: SAME_AS,
  };
}

function websiteNode(lang: Lang) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL + '/',
    name: 'Archange Elie Yatte',
    inLanguage: ['fr', 'en'],
    publisher: { '@id': PERSON_ID },
    description: HOME[lang].description,
  };
}

export function homeGraph(lang: Lang) {
  const list = localizedProjects(lang);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(lang),
      websiteNode(lang),
      {
        '@type': 'ProfilePage',
        '@id': `${urlFor('/', lang)}#page`,
        url: urlFor('/', lang),
        name: HOME[lang].title,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': PERSON_ID },
        primaryImageOfPage: OG_IMAGE,
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        '@type': 'ItemList',
        name: lang === 'fr' ? 'Projets' : 'Projects',
        itemListElement: list.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: urlFor(`/projects/${p.id}`, lang),
          name: p.title,
        })),
      },
    ],
  };
}

export function projectMeta(id: string, lang: Lang) {
  const p = localizedProjects(lang).find((x) => x.id === id);
  if (!p) return null;
  const title =
    lang === 'fr'
      ? `${p.title} — ${p.category} | Projet d'Archange Elie Yatte`
      : `${p.title} — ${p.category} | Project by Archange Elie Yatte`;
  const description = p.description.length > 158 ? p.description.slice(0, 155).replace(/\s+\S*$/, '') + '…' : p.description;
  const url = urlFor(`/projects/${p.id}`, lang);
  const live = p.link && p.link !== '#';
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(lang),
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/projects/${p.id}#app`,
        name: p.title,
        description: p.detailedDescription,
        applicationCategory: p.category,
        operatingSystem: p.id === 'kami' ? 'Android, Linux' : 'Web',
        image: (p.images ?? [p.image]).map(abs),
        author: { '@id': PERSON_ID },
        creator: { '@id': PERSON_ID },
        dateCreated: String(p.year),
        keywords: p.technologies.join(', '),
        ...(live ? { url: p.link } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'fr' ? 'Accueil' : 'Home', item: urlFor('/', lang) },
          { '@type': 'ListItem', position: 2, name: lang === 'fr' ? 'Projets' : 'Projects', item: `${urlFor('/', lang)}#projets` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
  return { project: p, title, description, url, image: abs(p.image.endsWith('.svg') ? '/media/og-image.jpg' : p.image), graph };
}
