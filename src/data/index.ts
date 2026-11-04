export const projects = [
  {
    id: 'kami',
    title: 'K.A.M.I.',
    description: 'Kali Autonomous Mobile Interface — transforme un smartphone en centre de contrôle distant pour un hôte Kali Linux, via un tunnel VPN chiffré.',
    technologies: ['Flutter', 'FastAPI', 'Python', 'WebSocket', 'WireGuard/Tailscale', 'Ollama'],
    year: 2026,
    link: '#',
    image: '/media/projects/kami/accueil.webp',
    category: 'Pentesting',
    detailedDescription: 'K.A.M.I. transforme un smartphone en centre de contrôle distant pour un hôte Kali Linux : tableaux de bord système, terminal interactif, catalogue d\'outils de cybersécurité, gestion de missions, analyse assistée par IA locale et bureau distant. L\'application mobile (Flutter) ne parle jamais à l\'hôte Kali autrement qu\'à travers un tunnel VPN chiffré (WireGuard/Tailscale), vers un daemon FastAPI qui expose une API REST et plusieurs flux WebSocket temps réel (métriques, terminal, missions, bureau distant).',
    features: [
      'Dashboard temps réel (CPU/RAM/stockage/réseau) et statut de connexion à l\'hôte',
      'Catalogue d\'outils Nmap/Gobuster/Nikto/Metasploit avec formulaires guidés et badges de niveau de risque',
      'Missions : suivi asynchrone des scans (statut live, annulation, export JSON/PDF), notifications de fin',
      'IA locale (Ollama) pour l\'analyse assistée des résultats de scan, sans donnée envoyée hors du VPN',
      'Terminal shell PTY interactif (xterm.dart) avec reconnexion automatique',
      'Bureau distant via session Xfce dédiée, accessible par un client noVNC embarqué'
    ],
    images: [
      '/media/projects/kami/accueil.webp',
      '/media/projects/kami/outils.webp',
      '/media/projects/kami/missions.webp'
    ],
    videos: [],
    challenges: 'Exposer une interface de contrôle complète (terminal, bureau distant, lancement d\'outils offensifs) depuis un mobile sans jamais l\'exposer sur le réseau public, tout en gardant une latence utilisable en conditions réelles.',
    solutions: 'Toute communication transite exclusivement par le tunnel VPN vers le daemon FastAPI : appairage par JWT à usage unique, verrouillage biométrique côté app, sudoers restreints côté hôte (moindre privilège) et journal d\'audit consultable. Les 6 jalons de la roadmap V1 sont livrés et testés en conditions réelles (backend + application Android, via Tailscale).'
  },
  {
    id: 'cybergram',
    title: 'CyberGram V1',
    description: 'Écosystème cybersécurité tout-en-un : cours, communauté, veille CVE, workspace de pentest et back-office, avec permissions par rôle et abonnements.',
    technologies: ['Next.js', 'TypeScript', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
    year: 2026,
    link: 'https://cybergram.dev',
    mockups: true,
    image: '/media/projects/cybergram/accueil.webp',
    category: 'Cybersécurité',
    detailedDescription: 'CyberGram rassemble en une seule plateforme tout ce dont un apprenant ou un professionnel de la cybersécurité a besoin : des cours structurés, une communauté, une veille CVE à jour, un workspace de pentest et un back-office d\'administration. Le frontend est en Next.js/TypeScript, le backend en Django REST Framework avec PostgreSQL, Redis et Celery pour les tâches asynchrones, le tout conteneurisé avec Docker. La V1 a été lancée le 31 octobre 2026 sur cybergram.dev.',
    features: [
      'Cours et parcours d\'apprentissage en cybersécurité',
      'Communauté : publications, échanges et entraide',
      'Veille CVE : suivi des vulnérabilités publiées',
      'Workspace de pentest pour organiser ses missions',
      'Back-office d\'administration complet',
      'Permissions par rôle, gestion des abonnements et des droits d\'accès'
    ],
    images: [
      '/media/projects/cybergram/accueil.webp',
      '/media/projects/cybergram/dashboard.webp',
      '/media/projects/cybergram/learn.webp',
      '/media/projects/cybergram/intelligence.webp',
      '/media/projects/cybergram/communaute.webp',
      '/media/projects/cybergram/evenements.webp',
      '/media/projects/cybergram/blog.webp',
      '/media/projects/cybergram/admin-dashboard.webp',
      '/media/projects/cybergram/admin-securite.webp'
    ],
    videos: [],
    challenges: 'Faire cohabiter du contenu public, des espaces communautaires et des outils réservés aux abonnés dans une même plateforme, sans qu\'un utilisateur puisse accéder à ce qui ne lui est pas destiné.',
    solutions: 'Un modèle de permissions par rôle appliqué côté API (Django REST Framework), couplé à la gestion des abonnements : chaque ressource vérifie les droits de l\'utilisateur avant d\'être servie. Les traitements lourds (veille CVE, notifications) passent par Celery et Redis pour garder l\'interface réactive.'
  },
  {
    id: 'hackpen',
    title: 'HackPen',
    description: 'L\'espace de travail pentest de CyberGram : projets, cibles, findings, workflows automatisés, rapports et marketplace de plugins.',
    technologies: ['Next.js', 'TypeScript', 'Django', 'DRF', 'PostgreSQL', 'Celery', 'Docker'],
    year: 2026,
    link: '#',
    mockups: true,
    image: '/media/projects/hackpen/dashboard.webp',
    category: 'Pentesting',
    detailedDescription: 'HackPen est le module de tests d\'intrusion de l\'écosystème CyberGram. Il organise une mission de pentest de bout en bout : création du projet, inventaire des cibles, enchaînement des outils via des workflows, suivi des vulnérabilités trouvées (findings) jusqu\'à leur correction, puis génération des rapports. Une marketplace permet d\'étendre la plateforme avec des plugins, et l\'accès aux fonctionnalités dépend du plan d\'abonnement.',
    features: [
      'Tableau de bord : activité d\'exécution, répartition des findings par sévérité, projets récents',
      'Projets et cibles : inventaire des hôtes, services et vulnérabilités détectées par cible',
      'Findings : filtres par sévérité et statut, fiche détaillée avec description, preuve et remédiation',
      'Éditeur visuel de workflows : enchaîner reconnaissance, scan et exploitation en glisser-déposer',
      'Rapports : évolution des vulnérabilités, top des cibles touchées, export du rapport',
      'Marketplace de plugins pour étendre les capacités de la plateforme'
    ],
    images: [
      '/media/projects/hackpen/dashboard.webp',
      '/media/projects/hackpen/findings.webp',
      '/media/projects/hackpen/workflow-builder.webp',
      '/media/projects/hackpen/target.webp',
      '/media/projects/hackpen/rapports.webp',
      '/media/projects/hackpen/marketplace.webp'
    ],
    videos: [],
    challenges: 'Donner un cadre structuré et traçable à des missions de pentest souvent menées avec des outils dispersés, sans perdre la flexibilité dont un pentesteur a besoin.',
    solutions: 'Un modèle centré sur le projet (cibles, findings, rapports liés entre eux) et des workflows composables qui automatisent les enchaînements d\'outils répétitifs, intégrés aux comptes, rôles et abonnements de CyberGram.'
  },
  {
    id: 'indrawatch',
    title: 'IndraWatch',
    description: 'Global Web Observability & Intelligence Platform — monitoring, sécurité, performance et intelligence des sites web, avec détection d\'incidents et AI Analyst.',
    technologies: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Playwright', 'Nuxt 4', 'Docker'],
    year: 2026,
    link: 'https://indrawatch.com',
    image: '/media/projects/covers/indrawatch.svg',
    category: 'Observabilité',
    detailedDescription: 'Le monitoring classique se limite à répondre à « Est-ce que mon site est en ligne ? ». IndraWatch va plus loin et répond à : quel est l\'état réel de mon site, de mes services, de leurs performances, de leur sécurité et de leur expérience utilisateur ? Les 20 phases du backend (monitoring HTTP/API/SSL/DNS, incidents, sécurité/SEO, performance navigateur, détection de changements/anomalies, nœuds distribués, AI Analyst, pages de statut et rapports) sont implémentées et testées, avec une hiérarchie de rôles à 3 paliers (client/admin/super_admin). La plateforme est en production sur indrawatch.com, avec un frontend Nuxt 4.',
    features: [
      'Availability & API monitoring avec réduction des faux positifs',
      'Web Vitals (LCP, INP, CLS), Browser Monitoring (Playwright) et Synthetic Monitoring',
      'SSL/TLS et DNS Intelligence : validité, expiration, détection de changement',
      'Security & SEO Monitoring, Change & Anomaly Detection (fingerprinting de contenu)',
      'Health Score explicable par site, cycle de vie d\'incidents avec timeline corrélée',
      'AI Analyst : explication des incidents avec niveau de confiance, jamais d\'analyse simulée',
      'Pages de statut publiques et rapports périodiques (dashboard, PDF)',
      'Alertes e-mail, Telegram et webhook'
    ],
    images: ['/media/projects/covers/indrawatch.svg', '/media/projects/indrawatch/logo.webp'],
    videos: [],
    challenges: 'IndraWatch exécute des requêtes sortantes (HTTP, navigateur) vers des URLs fournies par des utilisateurs tiers — un vecteur SSRF classique — tout en devant garantir qu\'aucune donnée n\'est jamais simulée ou inventée quand une source réelle manque.',
    solutions: 'Chaque destination est validée par une garde SSRF avant toute requête sortante (HTTP, SSL, et requête par requête pour le navigateur), avec rate limiting et isolation des workers (HTTP/Browser/API séparés). Les composants sans source de données réelle pour un site donné sont explicitement listés comme indisponibles plutôt que simulés, et l\'AI Analyst renvoie un 503 explicite si aucune clé API n\'est configurée.'
  },
  {
    id: 'gatekeeper',
    title: 'GateKeeper',
    description: 'Plateforme centralisée de gestion des demandes et des accès (IAM) — workflows d\'approbation configurables, gestion du personnel, provisioning et audit.',
    technologies: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Nuxt 4', 'Docker', 'OIDC/SSO'],
    year: 2026,
    link: '#',
    image: '/media/projects/gatekeeper/dashboard.webp',
    category: 'IAM & Sécurité',
    detailedDescription: 'GateKeeper centralise la gestion des demandes et des accès : tickets, workflows de validation, provisioning et audit. Le cycle de vie d\'une demande couvre la création à partir d\'un formulaire dynamique piloté par schéma JSON, la soumission, un workflow d\'approbation configurable (étapes séquentielles, approbateurs ad hoc, escalade, délégation), jusqu\'à la prise en charge, la résolution et la clôture — avec signature électronique des décisions et export PDF.',
    features: [
      'Authentification locale + fédérée (OIDC/SSO), verrouillage de compte anti brute-force',
      'Workflow d\'approbation configurable avec escalade, délégation et signature électronique',
      'Access Provisioning Center : vue Kanban des demandes approuvées à provisionner',
      'StaffList : référentiel central du personnel, import/export Excel, organigramme interactif',
      'Fiabilisation des comptes : réconciliation IAM et accès biométriques, détection des comptes orphelins',
      'Identity Timeline & Identity 360° : chronologie consolidée par collaborateur (profil, risque, accès)',
      'Recherche globale (⌘K), notifications temps réel (SSE), journal d\'audit complet'
    ],
    images: [
      '/media/projects/gatekeeper/dashboard.webp',
      '/media/projects/gatekeeper/requests-list.webp',
      '/media/projects/gatekeeper/request-form.webp',
      '/media/projects/gatekeeper/request-types.webp'
    ],
    videos: [],
    challenges: 'Concevoir un moteur de workflow d\'approbation assez générique pour s\'adapter à des dizaines de types de demandes différents (accès, matériel, visiteurs...) sans coder un cas particulier par type, tout en garantissant une base fiable et testée sur le cœur métier.',
    solutions: 'Architecture en Clean Architecture avec formulaires dynamiques par schéma JSON et moteur de workflow découplé du contenu métier. Le cœur (domaine/application) est en mypy strict avec une couverture de tests maintenue au-dessus de 80 %, complété par Ruff (dont les règles de sécurité bandit) sur l\'ensemble du backend.'
  }
];
