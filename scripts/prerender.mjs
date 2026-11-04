// Pré-rendu SEO après `vite build` : une page HTML statique par route,
// avec titre, description, Open Graph, canonical, hreflang, JSON-LD
// et un contenu lisible sans JavaScript. Génère aussi le sitemap.
import { build } from 'esbuild';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const tmp = path.join(root, 'node_modules', '.seo-tmp', 'site.mjs');

await build({
  entryPoints: [path.join(root, 'src/seo/site.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: tmp,
  logLevel: 'silent',
});
const site = await import(pathToFileURL(tmp).href);
const { SITE_URL, OG_IMAGE, HOME, urlFor, homeGraph, projectMeta, localizedProjects, abs } = site;

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head({ title, description, routePath, image, type, graph }) {
  const url = urlFor(routePath, 'fr');
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta data-seo-static name="description" content="${esc(description)}" />`,
    `<meta data-seo-static name="robots" content="index, follow, max-image-preview:large" />`,
    `<link data-seo-static rel="canonical" href="${url}" />`,
    `<link data-seo-static rel="alternate" hreflang="fr" href="${urlFor(routePath, 'fr')}" />`,
    `<link data-seo-static rel="alternate" hreflang="en" href="${urlFor(routePath, 'en')}" />`,
    `<link data-seo-static rel="alternate" hreflang="x-default" href="${urlFor(routePath, 'fr')}" />`,
    `<meta data-seo-static property="og:type" content="${type}" />`,
    `<meta data-seo-static property="og:site_name" content="Archange Elie Yatte" />`,
    `<meta data-seo-static property="og:url" content="${url}" />`,
    `<meta data-seo-static property="og:title" content="${esc(title)}" />`,
    `<meta data-seo-static property="og:description" content="${esc(description)}" />`,
    `<meta data-seo-static property="og:image" content="${image}" />`,
    ...(image === OG_IMAGE
      ? [
          `<meta data-seo-static property="og:image:width" content="1200" />`,
          `<meta data-seo-static property="og:image:height" content="630" />`,
        ]
      : []),
    `<meta data-seo-static property="og:image:alt" content="Archange Elie Yatte" />`,
    `<meta data-seo-static property="og:locale" content="fr_FR" />`,
    `<meta data-seo-static property="og:locale:alternate" content="en_US" />`,
    `<meta data-seo-static name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo-static name="twitter:title" content="${esc(title)}" />`,
    `<meta data-seo-static name="twitter:description" content="${esc(description)}" />`,
    `<meta data-seo-static name="twitter:image" content="${image}" />`,
    `<script data-seo-static type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.join('\n    ');
}

function homeBody() {
  const list = localizedProjects('fr');
  return `<div id="seo-static">
  <header>
    <h1>Archange Elie Yatte</h1>
    <p><strong>Ingénieur Sécurité chez Huawei (GNOC Abidjan) &amp; Développeur Full-Stack</strong> — Abidjan, Côte d'Ivoire.</p>
    <p>${esc(HOME.fr.description)}</p>
  </header>
  <section>
    <h2>Expérience</h2>
    <ul>
      <li><strong>Ingénieur Sécurité — Huawei Technologies, GNOC Abidjan</strong> (depuis juillet 2026) : gestion des droits d'accès, comptes à privilèges, conformité et reporting à la Security Governance.</li>
      <li><strong>Développeur d'applications &amp; sécurité — SN-TECHNOLOGY</strong> (2025) : sites de MicroTest Microfinance CI et d'ISIRDAH-Plus SARLU, HackPen, WSAS.</li>
    </ul>
  </section>
  <section>
    <h2>Projets</h2>
    <ul>
${list.map((p) => `      <li><a href="/projects/${p.id}">${esc(p.title)}</a> — ${esc(p.description)}</li>`).join('\n')}
    </ul>
  </section>
  <section>
    <h2>Formation</h2>
    <p>Licence Informatique et Sciences du Numérique, spécialité Réseaux et Sécurité Informatique — Université Virtuelle de Côte d'Ivoire (2023–2024).</p>
  </section>
  <section>
    <h2>Contact</h2>
    <p><a href="mailto:archangeyatte@gmail.com">archangeyatte@gmail.com</a> · <a href="https://github.com/codelie14">GitHub</a> · <a href="https://linkedin.com/in/archange-yatte">LinkedIn</a> · <a href="/media/CV_YATTE_ARCHANGE.pdf">CV (PDF)</a> · <a href="/?lang=en">English version</a></p>
  </section>
</div>`;
}

function projectBody(m) {
  const p = m.project;
  const live = p.link && p.link !== '#';
  return `<div id="seo-static">
  <nav><a href="/">Archange Elie Yatte</a> › <a href="/#projets">Projets</a> › ${esc(p.title)}</nav>
  <article>
    <h1>${esc(p.title)}</h1>
    <p><em>${esc(p.category)} · ${p.year}</em>${live ? ` · <a href="${p.link}">${esc(p.link.replace('https://', ''))}</a>` : ''}</p>
    <p>${esc(p.detailedDescription)}</p>
${p.mockups ? '    <p><em>Visuels : maquettes de conception.</em></p>\n' : ''}    <h2>Fonctionnalités</h2>
    <ul>
${p.features.map((f) => `      <li>${esc(f)}</li>`).join('\n')}
    </ul>
    <h2>Technologies</h2>
    <p>${p.technologies.map(esc).join(', ')}</p>
    <h2>Le défi</h2>
    <p>${esc(p.challenges)}</p>
    <h2>La solution</h2>
    <p>${esc(p.solutions)}</p>
  </article>
</div>`;
}

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo-start-->') || !template.includes('<!--seo-body-->')) {
  throw new Error('prerender: marqueurs SEO absents de dist/index.html');
}
const render = (headHtml, bodyHtml) =>
  template.replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, headHtml).replace('<!--seo-body-->', bodyHtml);

// Accueil
await writeFile(
  path.join(dist, 'index.html'),
  render(
    head({ title: HOME.fr.title, description: HOME.fr.description, routePath: '/', image: OG_IMAGE, type: 'website', graph: homeGraph('fr') }),
    homeBody()
  )
);

// Projets
const projects = localizedProjects('fr');
await mkdir(path.join(dist, 'projects'), { recursive: true });
for (const p of projects) {
  const m = projectMeta(p.id, 'fr');
  await writeFile(
    path.join(dist, 'projects', `${p.id}.html`),
    render(
      head({ title: m.title, description: m.description, routePath: `/projects/${p.id}`, image: m.image, type: 'article', graph: m.graph }),
      projectBody(m)
    )
  );
}

// Sitemap avec alternatives de langue et images
const today = new Date().toISOString().slice(0, 10);
const entry = (routePath, images, priority) => `  <url>
    <loc>${urlFor(routePath, 'fr')}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${routePath === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${urlFor(routePath, 'fr')}" />
    <xhtml:link rel="alternate" hreflang="en" href="${esc(urlFor(routePath, 'en'))}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(routePath, 'fr')}" />
${images.map((i) => `    <image:image><image:loc>${esc(abs(i))}</image:loc></image:image>`).join('\n')}
  </url>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entry('/', ['/media/og-image.jpg', '/media/photo-profile.webp'], '1.0')}
${projects.map((p) => entry(`/projects/${p.id}`, Array.from(new Set(p.images)).filter((i) => !i.endsWith('.svg')), '0.8')).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await rm(path.dirname(tmp), { recursive: true, force: true });
console.log(`prerender: accueil + ${projects.length} projets + sitemap.xml`);
