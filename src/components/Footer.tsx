import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Magnetic, Marquee } from './motion/primitives';

function AbidjanClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString('fr-FR', { timeZone: 'Africa/Abidjan', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-border/60 overflow-hidden">
      <Marquee
        duration={30}
        items={[
          <span key="a" className="font-display font-bold text-[clamp(4rem,14vw,12rem)] leading-none tracking-[-0.04em] text-stroke-muted">
            Archange Elie Yatte
          </span>,
          <span key="b" className="text-primary text-5xl">✦</span>,
        ]}
      />
      <div className="section-container mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Archange Elie Yatte · IndraLabs</p>
        <p>
          Abidjan · <AbidjanClock /> GMT
        </p>
        <Magnetic>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
          >
            Haut de page <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
