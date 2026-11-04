import { useTr } from '@/i18n';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Counter, Reveal } from './motion/primitives';

const STATEMENT_FR =
  "Je sécurise les accès des systèmes critiques et je construis les applications qui les protègent. Entre la gouvernance IAM d'un centre d'opérations réseau et le code que je mets en production, je cherche toujours la même chose : des systèmes fiables, traçables, et dignes de confiance.";

const STATEMENT_EN =
  'I secure access to critical systems and I build the applications that protect them. From IAM governance in a network operations centre to the code I ship to production, I always aim for the same thing: systems that are reliable, traceable, and worthy of trust.';

const HIGHLIGHT = new Set(['sécurise', 'accès', 'construis', 'production,', 'fiables,', 'traçables,', 'confiance.', 'secure', 'access', 'build', 'production,', 'reliable,', 'traceable,', 'trust.']);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block mr-[0.28em] ${HIGHLIGHT.has(word) ? 'text-primary' : ''}`}>
      {word}
    </motion.span>
  );
}

const STATS_FR = [
  { n: 5, s: '', label: 'plateformes conçues de A à Z' },
  { n: 2, s: '', label: 'en production — IndraWatch & CyberGram' },
  { n: 80, s: '%+', label: 'de couverture de tests sur GateKeeper' },
  { n: 2026, s: '', label: 'Ingénieur Sécurité chez Huawei' },
];
const STATS_EN = [
  { n: 5, s: '', label: 'platforms built end to end' },
  { n: 2, s: '', label: 'in production — IndraWatch & CyberGram' },
  { n: 80, s: '%+', label: 'test coverage on GateKeeper' },
  { n: 2026, s: '', label: 'Security Engineer at Huawei' },
];

export default function About() {
  const tr = useTr();
  const STATEMENT = tr(STATEMENT_FR, STATEMENT_EN);
  const STATS = tr(STATS_FR, STATS_EN);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 85%', 'end 45%'] });
  const words = STATEMENT.split(' ');

  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pp } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(pp, [0, 1], ['-12%', '12%']);
  const clip = useTransform(pp, [0, 0.35], ['inset(30% 15% 30% 15% round 24px)', 'inset(0% 0% 0% 0% round 24px)']);

  return (
    <section id="apropos" className="relative py-28 md:py-40">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">{tr('01 — À propos', '01 — About')}</p>
        </Reveal>

        <p ref={textRef} className="mt-10 font-display font-semibold tracking-tight text-[clamp(1.7rem,4.2vw,3.6rem)] leading-[1.12] max-w-6xl">
          {words.map((w, i) => (
            <Word key={`${STATEMENT.length}-${i}`} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <motion.div ref={photoRef} style={{ clipPath: clip }} className="relative aspect-[4/5] max-w-md w-full overflow-hidden bg-card">
            <motion.img
              src="/media/photo-profile.webp"
              alt="Archange Elie Yatte"
              style={{ y: imgY, scale: 1.25 }}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute inset-0 scanlines opacity-30" />
            <div className="absolute bottom-5 left-5 right-5 font-mono text-xs">
              <p className="text-primary">● {tr('IDENTITÉ VÉRIFIÉE', 'IDENTITY VERIFIED')}</p>
              <p className="text-muted-foreground mt-1">Archange Elie Yatte · Abidjan, Côte d'Ivoire</p>
            </div>
          </motion.div>

          <div>
            <Reveal>
              <div className="terminal-card">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                  <span className="ml-3 text-xs text-muted-foreground font-mono">whoami.sh</span>
                </div>
                <div className="p-5 sm:p-6 font-mono text-sm space-y-4">
                  {tr(
                    [
                      ['poste', 'Ingénieur Sécurité — Huawei, GNOC Abidjan'],
                      ['mission', "Gestion des droits d'accès, comptes à privilèges, conformité"],
                      ['formation', 'Licence Informatique — Réseaux & Sécurité (UVCI)'],
                      ['marque', 'IndraLabs — projets & éducation cybersécurité'],
                      ['langues', 'Français courant · Anglais professionnel'],
                    ],
                    [
                      ['role', 'Security Engineer — Huawei, GNOC Abidjan'],
                      ['mission', 'Access rights management, privileged accounts, compliance'],
                      ['education', "Bachelor's in Computer Science — Networks & Security (UVCI)"],
                      ['brand', 'IndraLabs — cybersecurity projects & education'],
                      ['languages', 'French (fluent) · English (professional)'],
                    ]
                  ).map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                    >
                      <span className="text-accent">$</span> <span className="text-muted-foreground">{k}</span>
                      <p className="text-foreground pl-4 mt-0.5">{v}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-px bg-border/60 rounded-2xl overflow-hidden">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08} y={20} className="bg-background p-5 sm:p-6">
                  <p className="font-display text-4xl sm:text-5xl font-bold gradient-text tabular-nums">
                    <Counter to={s.n} suffix={s.s} />
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
