import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FilePlus2, UserCheck, ShieldCheck, KeyRound, ScrollText, RotateCcw, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTr } from '@/i18n';
import { Reveal, SplitReveal } from './motion/primitives';

const STEPS = [
  { icon: FilePlus2, fr: ['Demande', "Accès VPN demandé par K. Traoré"], en: ['Request', 'VPN access requested by K. Traoré'] },
  { icon: UserCheck, fr: ['Manager', 'Approuvée par le responsable'], en: ['Manager', 'Approved by line manager'] },
  { icon: ShieldCheck, fr: ['Sécurité', 'Contrôle du moindre privilège'], en: ['Security', 'Least-privilege check'] },
  { icon: KeyRound, fr: ['Provisioning', 'Compte créé, droits appliqués'], en: ['Provisioning', 'Account created, rights applied'] },
  { icon: ScrollText, fr: ['Audit', 'Décision signée et journalisée'], en: ['Audit', 'Decision signed and logged'] },
];

const LOGS_FR = [
  'REQ-2048 créée · formulaire « Accès VPN » validé',
  'Étape 1/2 · manager → APPROUVÉ (signature électronique)',
  'Étape 2/2 · sécurité → APPROUVÉ · aucun conflit de rôles',
  'Provisioning · groupe vpn-users ajouté · expiration 90 j',
  'Audit · événement scellé · rapport PDF généré',
];
const LOGS_EN = [
  'REQ-2048 created · “VPN access” form validated',
  'Step 1/2 · manager → APPROVED (e-signature)',
  'Step 2/2 · security → APPROVED · no role conflict',
  'Provisioning · vpn-users group added · expires in 90 d',
  'Audit · event sealed · PDF report generated',
];

/** Démonstration animée du cycle de vie d'une demande d'accès (GateKeeper). */
export default function IamFlow() {
  const tr = useTr();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px' });
  const [step, setStep] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setStep(-1);
    const timers = STEPS.map((_, i) => setTimeout(() => setStep(i), 600 + i * 1300));
    const loop = setTimeout(() => setRun((r) => r + 1), 600 + STEPS.length * 1300 + 3500);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(loop);
    };
  }, [inView, run]);

  const logs = tr(LOGS_FR, LOGS_EN);
  const pct = step < 0 ? 0 : (step / (STEPS.length - 1)) * 100;

  return (
    <section id="iam" className="relative py-28 md:py-40 overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">{tr('IAM en action', 'IAM in action')}</p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display font-bold tracking-tight text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] max-w-4xl">
            <SplitReveal key={tr('a', 'b')} text={tr('Chaque accès, tracé.', 'Every access, traced.')} />
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-muted-foreground">
              {tr(
                "Le cycle de vie d'une demande d'accès, tel que je l'ai conçu dans GateKeeper — et tel que je le pratique au quotidien.",
                "The lifecycle of an access request, as I designed it in GateKeeper — and as I practise it every day."
              )}
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-16 rounded-[28px] border border-border/70 bg-card/40 backdrop-blur-xl p-6 sm:p-10">
          {/* Pipeline */}
          <div className="relative">
            <div className="absolute left-6 right-6 top-6 h-px bg-border hidden md:block" />
            <motion.div
              className="absolute left-6 top-6 h-px bg-gradient-to-r from-primary to-accent hidden md:block shadow-[0_0_10px_hsl(var(--primary))]"
              animate={{ width: `calc((100% - 3rem) * ${pct / 100})` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-4">
              {STEPS.map((s, i) => {
                const [title, desc] = tr(s.fr, s.en);
                const done = step >= i;
                const active = step === i;
                return (
                  <div key={i} className="relative flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                    <motion.div
                      animate={{
                        scale: active ? 1.12 : 1,
                        backgroundColor: done ? 'hsl(187 100% 50%)' : 'hsl(220 20% 9%)',
                        borderColor: done ? 'hsl(187 100% 50%)' : 'hsl(220 20% 18%)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative z-10 grid place-items-center w-12 h-12 shrink-0 rounded-2xl border"
                    >
                      {done && !active ? (
                        <Check className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <s.icon className={`w-5 h-5 ${done ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      )}
                      {active && <span className="absolute inset-0 rounded-2xl animate-ping bg-primary/40" />}
                    </motion.div>
                    <div className="md:mt-5">
                      <p className={`font-display font-semibold transition-colors ${done ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {String(i + 1).padStart(2, '0')} · {title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Journal d'audit */}
          <div className="mt-10 rounded-2xl border border-border/60 bg-background/70 font-mono text-xs sm:text-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
              <span className="text-muted-foreground">audit.log — gatekeeper</span>
              <button
                onClick={() => setRun((r) => r + 1)}
                className="inline-flex items-center gap-1.5 text-primary hover:text-accent transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> {tr('Rejouer', 'Replay')}
              </button>
            </div>
            <div className="p-4 min-h-[11rem] space-y-1.5">
              <AnimatePresence initial={false}>
                {logs.slice(0, step + 1).map((l, i) => (
                  <motion.p
                    key={`${run}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={i === STEPS.length - 1 ? 'text-accent' : 'text-foreground/85'}
                  >
                    <span className="text-muted-foreground">[{`${String(8 + i).padStart(2, "0")}:4${i}:1${i}`}]</span> {l}
                  </motion.p>
                ))}
              </AnimatePresence>
              {step < STEPS.length - 1 && <span className="inline-block w-2 h-4 bg-primary animate-pulse align-middle" />}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="text-muted-foreground">
              {tr('Données de démonstration — aucun compte réel.', 'Demo data — no real account.')}
            </p>
            <Link to="/projects/gatekeeper" className="text-primary hover:underline underline-offset-4">
              {tr('Voir le projet GateKeeper →', 'See the GateKeeper project →')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
