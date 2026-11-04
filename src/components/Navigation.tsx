import { useTr, useLang } from '@/i18n';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useBooted } from './motion/boot';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundOn, onSoundChange, setSound } from './fx/sound';

const LINKS = [
  { href: '#apropos', fr: 'À propos', en: 'About' },
  { href: '#parcours', fr: 'Parcours', en: 'Journey' },
  { href: '#projets', fr: 'Projets', en: 'Work' },
  { href: '#competences', fr: 'Compétences', en: 'Skills' },
  { href: '#contact', fr: 'Contact', en: 'Contact' },
];

export default function Navigation() {
  const booted = useBooted();
  const tr = useTr();
  const { lang, toggle } = useLang();
  const navLinks = LINKS.map((l) => ({ href: l.href, label: tr(l.fr, l.en) }));
  const [open, setOpen] = useState(false);
  const [sound, setSoundState] = useState(isSoundOn());
  useEffect(() => onSoundChange(setSoundState), []);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 300 && !open);
    setScrolled(v > 40);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: booted && !hidden ? 0 : -100 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-[80]"
      >
        <div className="section-container pt-4">
          <div
            className={`flex items-center justify-between h-14 px-4 sm:px-5 rounded-full transition-all duration-500 ${
              scrolled || open ? 'bg-background/70 backdrop-blur-xl border border-border/60' : 'border border-transparent'
            }`}
          >
            <a href="#accueil" className="flex items-center gap-2 font-display font-bold text-lg" onClick={() => setOpen(false)}>
              <span className="grid place-items-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs">AY</span>
              <span className="hidden sm:inline">
                Archange<span className="text-primary">.</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="nav-roll px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
                  <span data-text={l.label}>{l.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSound(!sound)}
                aria-label={sound ? tr('Couper les sons', 'Mute sounds') : tr('Activer les sons', 'Enable sounds')}
                className={`grid place-items-center w-9 h-9 rounded-full border transition-colors ${sound ? 'border-primary text-primary' : 'border-border/70 text-muted-foreground hover:text-foreground'}`}
              >
                {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={toggle}
                aria-label={tr('Switch to English', 'Passer en français')}
                className="relative h-9 w-[4.5rem] rounded-full border border-border/70 font-mono text-xs grid grid-cols-2 items-center overflow-hidden"
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-primary"
                  style={{ left: lang === 'fr' ? 4 : 'calc(50%)' }}
                />
                <span className={`relative z-10 ${lang === 'fr' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>FR</span>
                <span className={`relative z-10 ${lang === 'en' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>EN</span>
              </button>
              <a
                href="/media/CV_YATTE_ARCHANGE.pdf"
                download
                className="hidden md:inline-flex items-center rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold hover:bg-primary transition-colors"
              >
                {tr('Télécharger CV', 'Download CV')}
              </a>

            <button
              className="md:hidden relative w-10 h-10 grid place-items-center"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <motion.span animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} className="absolute w-6 h-[2px] bg-foreground" />
              <motion.span animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} className="absolute w-6 h-[2px] bg-foreground" />
            </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[75] bg-[hsl(220_22%_3%)] md:hidden flex flex-col justify-center px-6"
          >
            {navLinks.map((l, i) => (
              <div key={l.href} className="overflow-hidden">
                <motion.a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.06 }}
                  className="flex items-baseline gap-4 py-2 font-display text-5xl font-bold"
                >
                  <span className="font-mono text-sm text-primary">0{i + 1}</span>
                  {l.label}
                </motion.a>
              </div>
            ))}
            <motion.a
              href="/media/CV_YATTE_ARCHANGE.pdf"
              download
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 self-start rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold"
            >
              {tr('Télécharger mon CV', 'Download my CV')}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
