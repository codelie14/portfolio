import { lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTr } from '@/i18n';
import { Near } from './three/Lazy3D';
import { Reveal, SplitReveal } from './motion/primitives';

const Globe = lazy(() => import('./three/Globe'));

type Site = { name: string; url: string; up: boolean; status: number; ms: number };
type Payload = { checkedAt: string; sites: Site[] };

function Spark({ values }: { values: number[] }) {
  if (values.length < 2) return <div className="h-8" />;
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${30 - (v / max) * 26}`).join(' ');
  return (
    <svg viewBox="0 0 100 32" className="w-full h-8" preserveAspectRatio="none" aria-hidden>
      <polyline points={pts} fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Statut réel de mes plateformes, vérifié côté serveur (fonction Vercel /api/status). */
function LiveStatus() {
  const tr = useTr();
  const [data, setData] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  const [hist, setHist] = useState<Record<string, number[]>>({});

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch('/api/status', { cache: 'no-store' });
        if (!r.ok) throw new Error(String(r.status));
        const j: Payload = await r.json();
        if (!alive) return;
        setData(j);
        setFailed(false);
        setHist((h) => {
          const n = { ...h };
          j.sites.forEach((s) => (n[s.url] = [...(n[s.url] ?? []), s.ms].slice(-20)));
          return n;
        });
      } catch {
        if (alive) setFailed(true);
      }
    };
    load();
    const id = setInterval(load, 30000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="rounded-[24px] border border-border/70 bg-card/50 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60 font-mono text-xs">
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${failed ? 'bg-yellow-400' : 'bg-accent animate-pulse'}`} />
          {tr('Statut en direct', 'Live status')}
        </span>
        <span className="text-muted-foreground">
          {data ? new Date(data.checkedAt).toLocaleTimeString(tr('fr-FR', 'en-GB'), { timeZone: 'Africa/Abidjan' }) + ' GMT' : '—'}
        </span>
      </div>
      <div className="divide-y divide-border/60">
        {(data?.sites ?? [
          { name: 'IndraWatch', url: 'https://indrawatch.com', up: false, status: 0, ms: 0 },
          { name: 'CyberGram', url: 'https://cybergram.dev', up: false, status: 0, ms: 0 },
          { name: 'Portfolio', url: 'https://archangeyatte.vercel.app', up: false, status: 0, ms: 0 },
        ]).map((s) => (
          <div key={s.url} className="px-5 py-4 grid grid-cols-[1fr_auto] gap-x-4 items-center">
            <div className="min-w-0">
              <p className="font-medium">{s.name}</p>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-primary truncate block">
                {s.url.replace('https://', '')}
              </a>
            </div>
            <div className="text-right font-mono text-xs">
              {data ? (
                <>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${s.up ? 'bg-accent/15 text-accent' : 'bg-destructive/15 text-destructive'}`}>
                    {s.up ? tr('EN LIGNE', 'ONLINE') : tr('HORS LIGNE', 'DOWN')}
                  </span>
                  <p className="mt-1 text-muted-foreground tabular-nums">{s.up ? `${s.ms} ms` : s.status || '—'}</p>
                </>
              ) : (
                <span className="text-muted-foreground">{failed ? tr('indisponible', 'unavailable') : tr('vérification…', 'checking…')}</span>
              )}
            </div>
            <div className="col-span-2 mt-2">
              <Spark values={hist[s.url] ?? []} />
            </div>
          </div>
        ))}
      </div>
      <p className="px-5 py-3 border-t border-border/60 text-[11px] text-muted-foreground">
        {tr('Vérifié côté serveur toutes les 30 secondes — données réelles.', 'Checked server-side every 30 seconds — real data.')}
      </p>
    </div>
  );
}

export default function CommandCenter() {
  const tr = useTr();
  return (
    <section id="reseau" className="relative py-28 md:py-40 overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">{tr('Centre de contrôle', 'Command center')}</p>
        </Reveal>
        <h2 className="mt-6 font-display font-bold tracking-tight text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] max-w-4xl">
          <SplitReveal key={tr('a', 'b')} text={tr('Depuis Abidjan, vers le monde.', 'From Abidjan, to the world.')} />
        </h2>

        <div className="mt-12 grid lg:grid-cols-[1.25fr_0.75fr] gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-full max-w-[640px] mx-auto"
          >
            <Near
              fallback={<div className="absolute inset-[12%] rounded-full border border-primary/20 bg-[radial-gradient(circle,hsl(var(--primary)/0.15),transparent_70%)]" />}
            >
              <Globe className="absolute inset-0" />
            </Near>
            <div className="absolute left-2 bottom-2 font-mono text-[11px] text-muted-foreground pointer-events-none">
              <p className="text-accent">● ABIDJAN — 05°19′N 04°01′W</p>
              <p>{tr('Glissez pour faire tourner', 'Drag to rotate')}</p>
            </div>
          </motion.div>
          <Reveal delay={0.15}>
            <LiveStatus />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
