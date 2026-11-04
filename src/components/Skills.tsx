import { useTr } from '@/i18n';
import { motion } from 'framer-motion';
import { Code2, Database, Server, ShieldCheck, Bug } from 'lucide-react';
import { Marquee, Reveal, SplitReveal } from './motion/primitives';

const ROW1 = ['Python', 'FastAPI', 'Django', 'TypeScript', 'Next.js', 'Nuxt 4', 'React', 'Vue 3', 'Node.js', 'PHP'];
const ROW2 = ['IAM', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Nginx', 'WireGuard', 'Nmap', 'Wireshark', 'OWASP'];

const GROUPS_FR = [
  {
    icon: ShieldCheck,
    title: 'Réseau & sécurité',
    items: ['Gestion des droits d’accès', 'Comptes à privilèges', 'LAN/WAN, TCP/IP', 'Pare-feu, VPN (WireGuard)', 'Analyse de vulnérabilités', 'Nmap, Wireshark'],
  },
  {
    icon: Bug,
    title: 'Sécurité applicative',
    items: ['OWASP Top 10', 'XSS, CSRF, injection SQL', 'SSRF, rate limiting', 'JWT, 2FA TOTP', 'Argon2, bcrypt', 'OIDC / SSO'],
  },
  {
    icon: Code2,
    title: 'Développement',
    items: ['Python, PHP (MVC)', 'JavaScript, TypeScript', 'FastAPI, Django, Node.js', 'React, Next.js', 'Vue 3, Nuxt 4', 'API REST, Flutter'],
  },
  {
    icon: Database,
    title: 'Données',
    items: ['PostgreSQL, MySQL', 'Redis', 'Celery (tâches async)', 'Tableaux de bord', 'Rapports PDF', 'SQL'],
  },
  {
    icon: Server,
    title: 'Systèmes & DevOps',
    items: ['Linux & Windows', 'Docker', 'Git, CI/CD', 'Nginx, Cloudflare', 'Playwright', 'Support utilisateurs'],
  },
];

const GROUPS_EN = [
  { icon: ShieldCheck, title: 'Network & security', items: ['Access rights management', 'Privileged accounts', 'LAN/WAN, TCP/IP', 'Firewall, VPN (WireGuard)', 'Vulnerability assessment', 'Nmap, Wireshark'] },
  { icon: Bug, title: 'Application security', items: ['OWASP Top 10', 'XSS, CSRF, SQL injection', 'SSRF, rate limiting', 'JWT, 2FA TOTP', 'Argon2, bcrypt', 'OIDC / SSO'] },
  { icon: Code2, title: 'Development', items: ['Python, PHP (MVC)', 'JavaScript, TypeScript', 'FastAPI, Django, Node.js', 'React, Next.js', 'Vue 3, Nuxt 4', 'REST APIs, Flutter'] },
  { icon: Database, title: 'Data', items: ['PostgreSQL, MySQL', 'Redis', 'Celery (async jobs)', 'Dashboards', 'PDF reports', 'SQL'] },
  { icon: Server, title: 'Systems & DevOps', items: ['Linux & Windows', 'Docker', 'Git, CI/CD', 'Nginx, Cloudflare', 'Playwright', 'User support'] },
];

function Word({ t }: { t: string }) {
  return (
    <>
      <span className="font-display font-bold text-[clamp(2.8rem,8vw,7rem)] leading-none tracking-tight text-stroke-muted hover:text-primary transition-colors duration-300">
        {t}
      </span>
      <span className="text-primary text-3xl">✦</span>
    </>
  );
}

export default function Skills() {
  const tr = useTr();
  const GROUPS = tr(GROUPS_FR, GROUPS_EN);
  return (
    <section id="competences" className="relative py-28 md:py-40 overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">{tr('04 — Compétences', '04 — Skills')}</p>
        </Reveal>
        <h2 className="mt-6 font-display font-bold tracking-tight text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95]">
          <SplitReveal text="Arsenal" />
          <span className="text-primary">.</span>
        </h2>
      </div>

      <div className="mt-16 space-y-4 -rotate-2">
        <Marquee items={ROW1.map((t) => <Word key={t} t={t} />)} duration={45} />
        <Marquee items={ROW2.map((t) => <Word key={t} t={t} />)} duration={50} reverse />
      </div>

      <div className="section-container mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GROUPS.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 40, rotateX: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
            }}
            className={`spotlight-card relative rounded-3xl border border-border/70 bg-card/40 p-7 ${i === 0 ? 'lg:row-span-2' : ''}`}
          >
            <g.icon className="w-7 h-7 text-primary" />
            <h3 className="mt-5 font-display text-xl font-semibold">{g.title}</h3>
            <ul className="mt-4 space-y-2">
              {g.items.map((it) => (
                <li key={it} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-primary/70 font-mono">›</span> {it}
                </li>
              ))}
            </ul>
            {i === 0 && (
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 font-mono text-xs leading-relaxed text-primary/90">
                <p className="text-muted-foreground">{tr('// au quotidien chez Huawei', '// day to day at Huawei')}</p>
                <p className="mt-2">create → modify → revoke</p>
                <p>rotate(admin_passwords)</p>
                <p>audit(compliance) → report(weekly)</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
