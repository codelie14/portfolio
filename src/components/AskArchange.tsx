import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
import { useTr } from '@/i18n';
import { useBooted } from './motion/boot';
import { sfx } from './fx/sound';

type Msg = { role: 'user' | 'assistant'; content: string };

/** Assistant IA qui répond aux questions sur le parcours d'Archange (fonction Vercel /api/ask). */
export default function AskArchange() {
  const tr = useTr();
  const booted = useBooted();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, busy]);

  const suggestions = tr(
    ['Quelle est son expérience en IAM ?', 'Quels projets sont en production ?', 'Comment le contacter ?'],
    ['What is his IAM experience?', 'Which projects are in production?', 'How can I contact him?']
  );

  const ask = async (q: string) => {
    const question = q.trim();
    if (!question || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', content: question }];
    setMsgs(next);
    setInput('');
    setBusy(true);
    sfx('send');
    try {
      const r = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const j = await r.json().catch(() => ({}));
      let reply: string;
      if (r.ok && j.reply) reply = j.reply;
      else if (r.status === 503)
        reply = tr(
          "L'assistant n'est pas encore activé. En attendant, écrivez à archangeyatte@gmail.com — il répond vite.",
          'The assistant is not enabled yet. Meanwhile, email archangeyatte@gmail.com — he replies fast.'
        );
      else if (r.status === 429) reply = tr('Beaucoup de questions ! Réessayez dans un moment.', 'Lots of questions! Please try again later.');
      else reply = tr('Une erreur est survenue. Réessayez ou écrivez à archangeyatte@gmail.com.', 'Something went wrong. Try again or email archangeyatte@gmail.com.');
      setMsgs((m) => [...m, { role: 'assistant', content: reply }]);
      sfx('ok');
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', content: tr('Connexion impossible.', 'Connection failed.') }]);
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={booted ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.2, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-[85] inline-flex items-center gap-2 h-12 pl-4 pr-5 rounded-2xl border border-accent/40 bg-background/80 backdrop-blur-xl text-sm font-medium shadow-[0_0_30px_-8px_hsl(var(--accent))] hover:border-accent transition-colors"
      >
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="hidden sm:inline">{tr('Demander à Archange', 'Ask Archange')}</span>
        <span className="sm:hidden">{tr('Question ?', 'Ask')}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed z-[130] inset-x-3 bottom-3 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[400px] max-h-[78svh] flex flex-col rounded-[24px] border border-accent/30 bg-[hsl(220_22%_5%/0.97)] backdrop-blur-xl shadow-[0_40px_120px_-30px_hsl(var(--accent)/0.45)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
              <img src="/media/photo-profile.webp" alt="" className="w-9 h-9 rounded-full object-cover border border-accent/50" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{tr('Demander à Archange', 'Ask Archange')}</p>
                <p className="text-[11px] text-muted-foreground">{tr('Assistant IA · répond à partir de son CV', 'AI assistant · answers from his CV')}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label={tr('Fermer', 'Close')} className="p-1.5 rounded-full hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px]">
              {msgs.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {tr('Posez une question sur son parcours, ses compétences ou ses projets.', 'Ask about his background, skills or projects.')}
                  </p>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="block w-full text-left text-sm px-3 py-2 rounded-xl border border-border/70 hover:border-accent/60 hover:text-accent transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user' ? 'ml-auto bg-primary text-primary-foreground rounded-br-md' : 'bg-card border border-border/70 rounded-bl-md'
                  }`}
                >
                  {m.content}
                </motion.div>
              ))}
              {busy && (
                <div className="flex gap-1 px-3.5 py-3 w-fit rounded-2xl bg-card border border-border/70">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 p-3 border-t border-border/60">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={600}
                placeholder={tr('Votre question…', 'Your question…')}
                className="flex-1 min-w-0 bg-transparent px-2 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={tr('Envoyer', 'Send')}
                className="grid place-items-center w-10 h-10 rounded-xl bg-accent text-accent-foreground disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="px-4 pb-3 text-[10px] text-muted-foreground">
              {tr("Réponses générées par IA, qui peuvent contenir des erreurs.", 'AI-generated answers, which may contain errors.')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
