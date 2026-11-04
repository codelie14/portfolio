import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, SplitReveal } from './motion/primitives';

const ITEMS = [
  {
    period: 'Juil. 2026 — aujourd’hui',
    role: 'Ingénieur Sécurité',
    org: 'Huawei Technologies — GNOC, Abidjan',
    points: [
      "Gestion des droits d'accès : suivi des créations, modifications et suppressions de comptes sur les plateformes des filiales, fiabilisation des comptes.",
      'Comptes administrateurs : changement périodique des mots de passe, passation des comptes, suivi des autorisations d’intervention.',
      'Conformité et reporting : contrôles de conformité, inventaire des actifs, rapport hebdomadaire à la Security Governance.',
    ],
    tags: ['IAM', 'Comptes à privilèges', 'Conformité', 'Security Governance'],
  },
  {
    period: '2025',
    role: 'Développeur d’applications & sécurité',
    org: 'SN-TECHNOLOGY — Abidjan',
    points: [
      'Conception, développement et mise en ligne des sites de MicroTest Microfinance CI et de l’agence immobilière ISIRDAH-Plus SARLU.',
      'HackPen (tests d’intrusion sous Linux) et WSAS (laboratoire XSS/CSRF).',
      'Support informatique : postes Windows/Linux, réseau, périphériques.',
    ],
    tags: ['Web', 'Pentest', 'OWASP', 'Support'],
  },
  {
    period: '2023 — 2024',
    role: 'Licence Informatique & Sciences du Numérique',
    org: 'Université Virtuelle de Côte d’Ivoire',
    points: ['Spécialité Réseaux et Sécurité Informatique.'],
    tags: ['Réseaux', 'Sécurité'],
  },
  {
    period: '2021',
    role: 'Baccalauréat Série C',
    org: 'Lycée Moderne 1 Adzopé',
    points: ['Mathématiques et sciences physiques.'],
    tags: [],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="parcours" className="relative py-28 md:py-40">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">02 — Parcours</p>
        </Reveal>
        <h2 className="mt-6 font-display font-bold tracking-tight text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95]">
          <SplitReveal text="Expérience" />
          <span className="text-primary">.</span>
        </h2>

        <div ref={ref} className="relative mt-20 pl-8 sm:pl-14">
          <div className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px bg-border" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[7px] sm:left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary via-cyber-blue to-accent shadow-[0_0_12px_hsl(var(--primary))]"
          />

          <div className="space-y-20">
            {ITEMS.map((it, i) => (
              <div key={it.role} className="relative grid md:grid-cols-[220px_1fr] gap-4 md:gap-12">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-40% 0px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="absolute -left-8 sm:-left-14 top-1.5 ml-[1px] sm:ml-[9px] w-3.5 h-3.5 rounded-full bg-background border-2 border-primary shadow-[0_0_16px_hsl(var(--primary))]"
                />
                <Reveal delay={0.05}>
                  <p className="font-mono text-sm text-primary">{it.period}</p>
                </Reveal>
                <Reveal delay={0.12}>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold">{it.role}</h3>
                  <p className="mt-1 text-muted-foreground">{it.org}</p>
                  <ul className="mt-5 space-y-2.5">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {it.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {it.tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs font-mono border border-primary/25 text-primary/90 bg-primary/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
