// Fonction Vercel : vérifie côté serveur que mes plateformes répondent.
const SITES = [
  { name: 'IndraWatch', url: 'https://indrawatch.com' },
  { name: 'CyberGram', url: 'https://cybergram.dev' },
  { name: 'Portfolio', url: 'https://archangeyatte.vercel.app' },
];

async function check(site: { name: string; url: string }) {
  const start = Date.now();
  try {
    const r = await fetch(site.url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
      headers: { 'user-agent': 'AY-portfolio-status/1.0' },
    });
    return { ...site, up: r.status < 500, status: r.status, ms: Date.now() - start };
  } catch {
    return { ...site, up: false, status: 0, ms: Date.now() - start };
  }
}

export async function GET() {
  const sites = await Promise.all(SITES.map(check));
  return Response.json(
    { checkedAt: new Date().toISOString(), sites },
    { headers: { 'cache-control': 'public, s-maxage=30, stale-while-revalidate=60' } }
  );
}
