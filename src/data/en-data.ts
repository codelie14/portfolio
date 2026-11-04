// Traductions anglaises des projets (données pures, sans React).
export type Override = {
  description: string;
  category: string;
  detailedDescription: string;
  features: string[];
  challenges: string;
  solutions: string;
};

export const projectsEn: Record<string, Override> = {
  kami: {
    category: 'Pentesting',
    description:
      'Kali Autonomous Mobile Interface — turns a smartphone into a remote control center for a Kali Linux host, through an encrypted VPN tunnel.',
    detailedDescription:
      'K.A.M.I. turns a smartphone into a remote control center for a Kali Linux host: system dashboards, interactive terminal, a catalogue of security tools, mission management, local-AI-assisted analysis and remote desktop. The Flutter app only ever talks to the Kali host through an encrypted VPN tunnel (WireGuard/Tailscale), to a FastAPI daemon exposing a REST API and several real-time WebSocket streams (metrics, terminal, missions, remote desktop).',
    features: [
      'Real-time dashboard (CPU/RAM/storage/network) and host connection status',
      'Nmap/Gobuster/Nikto/Metasploit catalogue with guided forms and risk-level badges',
      'Missions: asynchronous scan tracking (live status, cancel, JSON/PDF export), completion notifications',
      'Local AI (Ollama) to help analyse scan results, with no data leaving the VPN',
      'Interactive PTY shell (xterm.dart) with automatic reconnection',
      'Remote desktop through a dedicated Xfce session, via an embedded noVNC client',
    ],
    challenges:
      'Exposing a full control interface (terminal, remote desktop, offensive tools) from a phone without ever exposing it to the public internet, while keeping latency usable in real conditions.',
    solutions:
      'All traffic goes exclusively through the VPN tunnel to the FastAPI daemon: single-use JWT pairing, biometric lock in the app, restricted sudoers on the host (least privilege) and a browsable audit log. All 6 V1 milestones are delivered and tested in real conditions (backend + Android app, over Tailscale).',
  },
  cybergram: {
    category: 'Cybersecurity',
    description:
      'All-in-one cybersecurity ecosystem: courses, community, CVE watch, pentest workspace and back-office, with role-based permissions and subscriptions.',
    detailedDescription:
      'CyberGram brings together everything a cybersecurity learner or professional needs: structured courses, a community, an up-to-date CVE feed, a pentest workspace and an admin back-office. The frontend is built with Next.js/TypeScript, the backend with Django REST Framework, PostgreSQL, Redis and Celery for async jobs, all containerised with Docker. V1 launched on 31 October 2026 at cybergram.dev.',
    features: [
      'Cybersecurity courses and learning paths',
      'Community: posts, discussions and peer help',
      'CVE watch: tracking of published vulnerabilities',
      'Pentest workspace to organise engagements',
      'Full administration back-office',
      'Role-based permissions, subscriptions and access rights',
    ],
    challenges:
      'Hosting public content, community spaces and subscriber-only tools in one platform, without any user reaching what is not meant for them.',
    solutions:
      'A role-based permission model enforced at the API level (Django REST Framework), tied to subscription management: every resource checks the user’s rights before being served. Heavy jobs (CVE watch, notifications) run through Celery and Redis to keep the interface responsive.',
  },
  hackpen: {
    category: 'Pentesting',
    description: 'Linux penetration-testing platform. A safe environment to learn and practise pentesting techniques.',
    detailedDescription:
      'HackPen is an interactive learning platform designed to train security practitioners in penetration-testing techniques. Built on Linux, it provides an isolated, safe environment where users can legally practise a range of pentesting methods.',
    features: [
      'Sandboxed Linux environment for safe testing',
      'Hands-on labs at several difficulty levels',
      'Progress tracking and badges',
      'Docker integration for realistic scenarios',
      'Pre-installed pentesting tools (Nmap, Metasploit, Burp Suite)',
    ],
    challenges:
      'Building an environment that is both realistic and safe was the main technical challenge, especially resource isolation and preventing leaks.',
    solutions:
      'A Docker-based architecture with ephemeral containers and strict security policies guarantees the platform’s integrity.',
  },
  indrawatch: {
    category: 'Observability',
    description:
      'Global Web Observability & Intelligence Platform — monitoring, security, performance and intelligence for websites, with incident detection and an AI Analyst.',
    detailedDescription:
      'Classic monitoring only answers “is my site up?”. IndraWatch goes further: what is the real state of my site, my services, their performance, their security and their user experience? All 20 backend phases (HTTP/API/SSL/DNS monitoring, incidents, security/SEO, browser performance, change/anomaly detection, distributed nodes, AI Analyst, status pages and reports) are implemented and tested, with a 3-tier role hierarchy (client/admin/super_admin). The platform is in production at indrawatch.com, with a Nuxt 4 frontend.',
    features: [
      'Availability & API monitoring with false-positive reduction',
      'Web Vitals (LCP, INP, CLS), browser monitoring (Playwright) and synthetic monitoring',
      'SSL/TLS and DNS intelligence: validity, expiry, change detection',
      'Security & SEO monitoring, change & anomaly detection (content fingerprinting)',
      'Explainable health score per site, incident lifecycle with a correlated timeline',
      'AI Analyst: explains incidents with a confidence level, never simulated analysis',
      'Public status pages and periodic reports (dashboard, PDF)',
      'Email, Telegram and webhook alerts',
    ],
    challenges:
      'IndraWatch makes outbound requests (HTTP, browser) to URLs supplied by third-party users — a classic SSRF vector — while guaranteeing that no data is ever simulated or invented when a real source is missing.',
    solutions:
      'Every destination goes through an SSRF guard before any outbound request (HTTP, SSL, and per request for the browser), with rate limiting and worker isolation (separate HTTP/Browser/API). Components with no real data source for a given site are explicitly listed as unavailable rather than simulated, and the AI Analyst returns an explicit 503 if no API key is configured.',
  },
  gatekeeper: {
    category: 'IAM & Security',
    description:
      'Centralised request and access management platform (IAM) — configurable approval workflows, staff management, provisioning and audit.',
    detailedDescription:
      'GateKeeper centralises request and access management: tickets, approval workflows, provisioning and audit. A request’s lifecycle covers creation from a dynamic form driven by a JSON schema, submission, a configurable approval workflow (sequential steps, ad hoc approvers, escalation, delegation), through to handling, resolution and closure — with electronic signature of decisions and PDF export.',
    features: [
      'Local + federated authentication (OIDC/SSO), anti brute-force account lockout',
      'Configurable approval workflow with escalation, delegation and e-signature',
      'Access Provisioning Center: Kanban view of approved requests to provision',
      'StaffList: central staff directory, Excel import/export, interactive org chart',
      'Account reconciliation: IAM vs biometric access, orphan account detection',
      'Identity Timeline & Identity 360°: consolidated per-employee history (profile, risk, access)',
      'Global search (⌘K), real-time notifications (SSE), full audit log',
    ],
    challenges:
      'Designing an approval workflow engine generic enough to handle dozens of request types (access, hardware, visitors…) without coding a special case for each, while keeping the business core reliable and tested.',
    solutions:
      'Clean Architecture with JSON-schema dynamic forms and a workflow engine decoupled from business content. The core (domain/application) runs under strict mypy with test coverage kept above 80%, plus Ruff (including bandit security rules) across the backend.',
  },
};

