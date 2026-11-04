import { useTr } from '@/i18n';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Download, Github, Linkedin, Facebook } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import NetworkCanvas from './motion/NetworkCanvas';
import { Magnetic, ScrambleText } from './motion/primitives';
import { useBooted } from './motion/boot';

const ROLES_FR = ['Ingénieur Sécurité', 'Développeur Full-Stack', 'IAM & Security Governance', "Fondateur d'IndraLabs"];
const ROLES_EN = ['Security Engineer', 'Full-Stack Developer', 'IAM & Security Governance', 'Founder of IndraLabs'];
const EASE = [0.16, 1, 0.3, 1] as const;

function BigLine({ text, delay, booted, className }: { text: string; delay: number; booted: boolean; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${className ?? ''}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="block">
        {text.split('').map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '115%', rotateX: -80, opacity: 0 }}
            animate={booted ? { y: '0%', rotateX: 0, opacity: 1 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
            style={{ transformOrigin: '50% 100%' }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const booted = useBooted();
  const tr = useTr();
  const ROLES = tr(ROLES_FR, ROLES_EN);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48]);

  const [role, setRole] = useState(0);
  useEffect(() => {
    if (!booted) return;
    const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, [booted]);

  return (
    <section ref={ref} id="accueil" className="relative h-[140svh] min-h-[900px]">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-[hsl(220_22%_3%)]"
      >
        {/* Fond : réseau vivant + halos */}
        <motion.div style={{ y: yBg }} className="absolute inset-0">
          <NetworkCanvas className="absolute inset-0 w-full h-full opacity-70" />
          <div className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full bg-primary/10 blur-[120px] animate-blob" />
          <div className="absolute -bottom-40 -right-20 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-[120px] animate-blob [animation-delay:-6s]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(220_22%_3%)_80%)]" />
        </motion.div>

        <motion.div
          style={{ y: yText, opacity }}
          className="relative z-10 h-full section-container flex flex-col justify-center pt-20 pb-24"
        >
          {/* Badge statut */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="inline-flex self-start items-center gap-3 px-4 py-2 mb-8 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs sm:text-sm font-mono text-primary/90">
              {tr('Ingénieur Sécurité @ Huawei — GNOC Abidjan', 'Security Engineer @ Huawei — GNOC Abidjan')}
            </span>
          </motion.div>

          {/* Nom monumental */}
          <h1 className="font-display font-bold leading-[0.88] tracking-[-0.04em] text-[clamp(3.2rem,13vw,11.5rem)] [perspective:800px]">
            <BigLine text="Archange" delay={0.2} booted={booted} />
            <BigLine
              text="Elie Yatte"
              delay={0.45}
              booted={booted}
              className="text-stroke"
            />
          </h1>

          {/* Rôle qui se déchiffre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-base sm:text-xl md:text-2xl"
          >
            <span className="text-muted-foreground">~/</span>
            <ScrambleText key={ROLES[role]} text={ROLES[role]} trigger={booted} delay={role === 0 ? 1.1 : 0} className="text-primary" />
            <span className="inline-block w-[0.55em] h-[1.1em] bg-primary/80 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {tr(
              'Je protège les accès et je construis des applications sécurisées — de la gouvernance IAM chez Huawei aux plateformes que je conçois et mets en production.',
              'I protect access and build secure applications — from IAM governance at Huawei to the platforms I design and ship to production.'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projets"
                data-cursor="Voir"
                className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground overflow-hidden"
              >
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]" />
                <span className="relative">{tr('Explorer mes projets', 'Explore my work')}</span>
                <ArrowDownRight className="relative w-5 h-5 transition-transform duration-500 group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/media/CV_YATTE_ARCHANGE.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 font-medium hover:border-primary/60 hover:text-primary transition-colors"
              >
                <Download className="w-4 h-4" /> CV
              </a>
            </Magnetic>
            <div className="flex items-center gap-2 ml-1">
              {[
                { icon: Github, href: 'https://github.com/codelie14', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/archange-yatte', label: 'LinkedIn' },
                { icon: Facebook, href: 'https://facebook.com/codelie14', label: 'Facebook' },
              ].map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid place-items-center w-12 h-12 rounded-full border border-border/70 text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bandeau bas : coordonnées + indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-0 inset-x-0 z-10 section-container flex items-end justify-between pb-6 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.2em]"
        >
          <span className="flex flex-col gap-1"><span>05°19′N · 04°01′W — Abidjan</span><span className="hidden md:inline text-primary/70">{tr('⌘K — ouvrir le terminal', '⌘K — open the terminal')}</span></span>
          <a href="#apropos" className="flex items-center gap-3 hover:text-primary transition-colors">
            <span className="hidden sm:inline">{tr('Défiler', 'Scroll')}</span>
            <span className="relative block w-px h-10 bg-border overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-primary animate-scroll-line" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
