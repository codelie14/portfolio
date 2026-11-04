import { useTr, useLang } from '@/i18n';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, MessageCircle, Send, Github, Linkedin, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Magnetic, Reveal, SplitReveal } from './motion/primitives';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'archangeyatte@gmail.com', href: 'mailto:archangeyatte@gmail.com' },
  { icon: Phone, label: 'Téléphone|Phone', value: '+225 05 75 92 58 80', href: 'tel:+2250575925880' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+225 07 11 45 48 41', href: 'https://wa.me/2250711454841' },
  { icon: MapPin, label: 'Localisation|Location', value: "Abidjan, Côte d'Ivoire", href: '' },
];

const socials = [
  { icon: Github, href: 'https://github.com/codelie14', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/archange-yatte', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com/codelie14', label: 'Facebook' },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="font-mono text-xs text-muted-foreground group-focus-within:text-primary transition-colors">{label}</span>
      <div className="relative mt-2">
        {children}
        <span className="absolute left-0 bottom-0 h-px w-full bg-border" />
        <span className="absolute left-0 bottom-0 h-px w-full bg-primary scale-x-0 origin-left group-focus-within:scale-x-100 transition-transform duration-500" />
      </div>
    </label>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const tr = useTr();
  const L = (s: string) => { const [f, e] = s.split('|'); return tr(f, e ?? f); };
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Archange Elie Yatte',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
      if (autoReplyTemplateId) {
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            autoReplyTemplateId,
            {
              from_name: 'Archange Elie Yatte',
              to_name: formData.name,
              to_email: formData.email,
              message: formData.message,
              from_email: formData.email,
              reply_to: formData.email,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        } catch (autoReplyError) {
          // la notification principale est partie : on n'échoue pas pour la réponse auto
          console.error('Auto-reply email failed:', autoReplyError);
        }
      }

      toast({ title: tr('Message envoyé !', 'Message sent!'), description: tr('Je vous répondrai dans les plus brefs délais.', 'I will get back to you shortly.') });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: tr("Erreur d'envoi", 'Sending failed'),
        description:
          error instanceof Error && error.message.includes('FAILED')
            ? tr("Impossible d'envoyer le message. Vérifiez votre connexion et réessayez.", 'Could not send the message. Check your connection and try again.')
            : tr("Une erreur s'est produite. Réessayez plus tard ou écrivez-moi directement par e-mail.", 'Something went wrong. Try again later or email me directly.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const input =
    'w-full bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground/40 resize-none';

  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.14),transparent_65%)] pointer-events-none" />
      <div className="relative section-container">
        <Reveal>
          <p className="section-kicker">05 — Contact</p>
        </Reveal>

        <h2 className="mt-6 font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,11vw,10rem)]">
          <SplitReveal key={tr('fr', 'en')} text={tr('Travaillons', "Let's work")} />
          <br />
          <span className="text-stroke">
            <SplitReveal key={tr('fr2', 'en2')} text={tr('ensemble.', 'together.')} delay={0.25} />
          </span>
        </h2>

        <div className="mt-20 grid lg:grid-cols-[1fr_1.1fr] gap-16">
          <div>
            <Reveal>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                {tr("Un poste en sécurité, un projet d'application, une collaboration IndraLabs ? Écrivez-moi, je réponds vite.", 'A security role, an application project, an IndraLabs collaboration? Write to me — I reply fast.')}
              </p>
            </Reveal>

            <div className="mt-10 divide-y divide-border/70 border-y border-border/70">
              {contactInfo.map((c, i) => {
                const Inner = (
                  <>
                    <c.icon className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-muted-foreground">{L(c.label)}</p>
                      <p className="mt-0.5 font-medium truncate">{c.value}</p>
                    </div>
                    {c.href && (
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:rotate-45" />
                    )}
                  </>
                );
                return (
                  <Reveal key={c.label} delay={i * 0.06} y={16}>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 py-5 hover:pl-3 transition-all duration-500"
                      >
                        {Inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 py-5">{Inner}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid place-items-center w-14 h-14 rounded-full border border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-[28px] border border-border/70 bg-card/40 backdrop-blur-xl p-6 sm:p-10 space-y-8">
              <Field label={tr('01 — Votre nom', '01 — Your name')}>
                <input
                  required
                  className={input}
                  placeholder="Jean Kouassi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Field>
              <Field label={tr('02 — Votre e-mail', '02 — Your email')}>
                <input
                  required
                  type="email"
                  className={input}
                  placeholder="jean@entreprise.ci"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Field>
              <Field label={tr('03 — Votre message', '03 — Your message')}>
                <textarea
                  required
                  rows={5}
                  className={input}
                  placeholder={tr('Parlez-moi de votre projet ou du poste…', 'Tell me about your project or the role…')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </Field>
              <Magnetic strength={0.2}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.97 }}
                  data-cursor={tr('Envoyer', 'Send')}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground overflow-hidden disabled:opacity-60"
                >
                  <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]" />
                  <span className="relative">{isSubmitting ? tr('Envoi en cours…', 'Sending…') : tr('Envoyer le message', 'Send message')}</span>
                  <Send className="relative w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
