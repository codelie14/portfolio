import { AnimatePresence, motion } from 'framer-motion';
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TerminalSquare, X } from 'lucide-react';
import { useLang, useTr } from '@/i18n';
import { useProjects } from '@/data/en';
import { useBooted } from './motion/boot';
import { triggerMatrix } from './fx/MatrixRain';
import { isSoundOn, setSound, sfx } from './fx/sound';

const FLAG_SHA256 = '541392082e162c2d7b2ea480dcd1eac5110df63c56b026b3bbd9c3196ee6048e';
async function sha256(t: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join('');
}

type Line = { id: number; node: ReactNode };
let uid = 0;

const COMMANDS = ['help', 'whoami', 'projets', 'open', 'competences', 'contact', 'cv', 'lang', 'sound', 'ctf', 'hint', 'submit', 'matrix', 'clear', 'exit', 'sudo'];

/** Terminal caché : ⌘K / Ctrl+K, la touche ², ou le bouton flottant. */
export default function Terminal() {
  const booted = useBooted();
  const tr = useTr();
  const { lang, setLang } = useLang();
  const projects = useProjects();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>([]);
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const greeted = useRef(false);

  const push = (...nodes: ReactNode[]) => setLines((l) => [...l, ...nodes.map((node) => ({ id: uid++, node }))]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if ((e.key === '²' || e.key === '`') && !(e.target as HTMLElement).closest('input,textarea')) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 150);
    if (!greeted.current) {
      greeted.current = true;
      push(
        <span className="text-primary">AY.sec shell v2.0 — Archange Elie Yatte</span>,
        <span className="text-muted-foreground">
          {tr("Tapez 'help' pour voir les commandes.", "Type 'help' to list commands.")}
        </span>
      );
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const goSection = (id: string) => {
    setOpen(false);
    if (location.pathname !== '/') navigate(`/#${id}`);
    else setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 250);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    push(
      <span>
        <span className="text-accent">visiteur@ay.sec</span>
        <span className="text-muted-foreground">:~$</span> {cmd}
      </span>
    );
    if (!cmd) return;
    setHist((h) => [cmd, ...h].slice(0, 30));
    const [name, ...args] = cmd.split(/\s+/);
    const c = name.toLowerCase();
    switch (c) {
      case 'help':
        push(
          ...[
            ['whoami', tr('qui je suis', 'who I am')],
            ['projets', tr('liste des projets', 'list projects')],
            ['open <id>', tr('ouvrir un projet (ex : open indrawatch)', 'open a project (e.g. open indrawatch)')],
            ['competences', tr('aller aux compétences', 'go to skills')],
            ['contact', tr('mes coordonnées', 'my contact details')],
            ['cv', tr('télécharger mon CV', 'download my CV')],
            ['lang fr|en', tr('changer de langue', 'switch language')],
            ['sound', tr('activer / couper les sons', 'toggle sounds')],
            ['ctf', tr('relever le défi de sécurité caché', 'take the hidden security challenge')],
            ['clear', tr("effacer l'écran", 'clear the screen')],
            ['exit', tr('fermer le terminal', 'close the terminal')],
          ].map(([k, v]) => (
            <span>
              <span className="text-primary inline-block w-28">{k}</span>
              <span className="text-muted-foreground">{v}</span>
            </span>
          ))
        );
        break;
      case 'whoami':
        push(
          <span className="text-foreground">Archange Elie Yatte</span>,
          <span className="text-muted-foreground">
            {tr('Ingénieur Sécurité @ Huawei — GNOC Abidjan', 'Security Engineer @ Huawei — GNOC Abidjan')}
          </span>,
          <span className="text-muted-foreground">
            {tr('IAM · sécurité applicative · développement full-stack · fondateur d’IndraLabs', 'IAM · application security · full-stack development · founder of IndraLabs')}
          </span>
        );
        break;
      case 'projets':
      case 'projects':
      case 'ls':
        push(
          ...projects.map((p) => (
            <span>
              <span className="text-primary inline-block w-28">{p.id}</span>
              <span className="text-muted-foreground">{p.title} · {p.category}</span>
            </span>
          )),
          <span className="text-muted-foreground">{tr('→ open <id> pour en savoir plus', '→ open <id> for details')}</span>
        );
        break;
      case 'open':
      case 'cd': {
        const p = projects.find((x) => x.id === (args[0] ?? '').toLowerCase().replace(/\./g, ''));
        if (!p) {
          push(<span className="text-destructive">{tr('Projet introuvable. Essayez : projets', 'Project not found. Try: projects')}</span>);
          break;
        }
        push(<span className="text-accent">{tr('Ouverture de', 'Opening')} {p.title}…</span>);
        setTimeout(() => {
          setOpen(false);
          navigate(`/projects/${p.id}`);
        }, 400);
        break;
      }
      case 'competences':
      case 'skills':
        push(<span className="text-accent">→ {tr('Compétences', 'Skills')}</span>);
        goSection('competences');
        break;
      case 'contact':
        push(
          <span>archangeyatte@gmail.com</span>,
          <span>+225 05 75 92 58 80 · WhatsApp +225 07 11 45 48 41</span>,
          <span className="text-muted-foreground">github.com/codelie14 · linkedin.com/in/archange-yatte</span>
        );
        break;
      case 'cv': {
        const a = document.createElement('a');
        a.href = '/media/CV_YATTE_ARCHANGE.pdf';
        a.download = 'CV_YATTE_ARCHANGE.pdf';
        a.click();
        push(<span className="text-accent">{tr('Téléchargement du CV…', 'Downloading CV…')}</span>);
        break;
      }
      case 'lang': {
        const l = args[0] === 'en' ? 'en' : args[0] === 'fr' ? 'fr' : lang === 'fr' ? 'en' : 'fr';
        setLang(l);
        push(<span className="text-accent">{l === 'en' ? 'Language: English' : 'Langue : français'}</span>);
        break;
      }
      case 'sound':
        setSound(!isSoundOn());
        push(<span className="text-accent">{isSoundOn() ? tr('Sons activés', 'Sound on') : tr('Sons coupés', 'Sound off')}</span>);
        break;
      case 'ctf':
        push(
          <span className="text-primary">{tr('🏁 Défi AY.sec — trouvez le flag caché sur ce site.', '🏁 AY.sec challenge — find the flag hidden on this site.')}</span>,
          <span className="text-muted-foreground">{tr('Format : FLAG{...} · validez avec : submit FLAG{...}', 'Format: FLAG{...} · submit it with: submit FLAG{...}')}</span>,
          <span className="text-muted-foreground">{tr("Bloqué ? tapez 'hint'.", "Stuck? type 'hint'.")}</span>
        );
        break;
      case 'hint':
        push(
          <span className="text-muted-foreground">{tr('Indice n°1 : les robots savent où ne pas aller.', 'Hint #1: robots know where not to go.')}</span>,
          <span className="text-muted-foreground">{tr('Indice n°2 : base64, puis César version 13.', 'Hint #2: base64, then Caesar with a shift of 13.')}</span>
        );
        break;
      case 'submit': {
        const guess = args.join(' ').trim();
        sha256(guess).then((h) => {
          if (h === FLAG_SHA256) {
            sfx('ok');
            push(
              <span className="text-accent">{tr('✔ Flag valide. Accès accordé — bravo !', '✔ Valid flag. Access granted — well done!')}</span>,
              <span className="text-muted-foreground">
                {tr("Écrivez-moi à archangeyatte@gmail.com avec l'objet « CTF » : j'adore rencontrer les curieux.", "Email me at archangeyatte@gmail.com with the subject “CTF” — I love meeting curious people.")}
              </span>
            );
            setTimeout(() => {
              setOpen(false);
              triggerMatrix(tr('Flag capturé. Bienvenue dans le réseau.', 'Flag captured. Welcome to the network.'));
            }, 1400);
          } else {
            sfx('error');
            push(<span className="text-destructive">{tr('✘ Flag invalide. Continuez à chercher…', '✘ Invalid flag. Keep looking…')}</span>);
          }
        });
        break;
      }
      case 'matrix':
        setOpen(false);
        setTimeout(() => triggerMatrix(), 300);
        break;
      case 'clear':
        setLines([]);
        break;
      case 'exit':
        setOpen(false);
        break;
      case 'sudo':
        push(
          <span className="text-destructive">
            {tr(
              "visiteur n'est pas dans le fichier sudoers. Cet incident sera signalé. 🙂",
              'visitor is not in the sudoers file. This incident will be reported. 🙂'
            )}
          </span>
        );
        break;
      case 'rm':
        push(<span className="text-destructive">{tr('Bien essayé. Accès refusé (moindre privilège).', 'Nice try. Access denied (least privilege).')}</span>);
        break;
      default:
        push(
          <span className="text-destructive">
            {c}: {tr("commande introuvable — tapez 'help'", "command not found — type 'help'")}
          </span>
        );
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1) sfx('key');
    if (e.key === 'Enter') {
      run(input);
      setInput('');
      setHi(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(hi + 1, hist.length - 1);
      if (n >= 0) {
        setHi(n);
        setInput(hist[n]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = hi - 1;
      setHi(n);
      setInput(n >= 0 ? hist[n] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (m) setInput(m + ' ');
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={booted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 18 }}
        onClick={() => setOpen(true)}
        aria-label={tr('Ouvrir le terminal', 'Open the terminal')}
        data-cursor="Shell"
        className="fixed bottom-5 right-5 z-[85] grid place-items-center w-12 h-12 rounded-2xl border border-primary/40 bg-background/80 backdrop-blur-xl text-primary shadow-[0_0_30px_-8px_hsl(var(--primary))] hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <TerminalSquare className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[140] flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.focus();
              }}
              initial={{ y: 40, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.97, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-2xl rounded-2xl border border-primary/30 bg-[hsl(220_22%_4%/0.96)] shadow-[0_40px_120px_-30px_hsl(var(--primary)/0.5)] overflow-hidden font-mono text-[13px]"
            >
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/60">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                <span className="ml-3 text-xs text-muted-foreground">visiteur@ay.sec — zsh</span>
                <button onClick={() => setOpen(false)} className="ml-auto text-muted-foreground hover:text-foreground" aria-label="Fermer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div ref={bodyRef} className="h-[52svh] sm:h-[380px] overflow-y-auto p-4 space-y-1 leading-relaxed">
                {lines.map((l) => (
                  <div key={l.id}>{l.node}</div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-accent shrink-0">visiteur@ay.sec</span>
                  <span className="text-muted-foreground shrink-0">:~$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    className="flex-1 min-w-0 bg-transparent outline-none text-foreground caret-primary"
                    aria-label="Commande"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-border/60">
                {['help', 'whoami', 'projets', 'open gatekeeper', 'ctf', 'contact'].map((s) => (
                  <button
                    key={s}
                    onClick={() => run(s)}
                    className="px-2.5 py-1 rounded-md border border-border/70 text-xs text-muted-foreground hover:text-primary hover:border-primary/50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
