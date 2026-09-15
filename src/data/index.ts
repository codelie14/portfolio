export const projects = [
  {
    id: 'kami',
    title: 'K.A.M.I.',
    description: 'Kali Autonomous Mobile Interface — transforme un smartphone en centre de contrôle distant pour un hôte Kali Linux, via un tunnel VPN chiffré.',
    technologies: ['Flutter', 'FastAPI', 'Python', 'WebSocket', 'WireGuard/Tailscale', 'Ollama'],
    year: 2026,
    link: '#',
    image: '/media/projects/kami/accueil.png',
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
      '/media/projects/kami/accueil.png',
      '/media/projects/kami/outils.png',
      '/media/projects/kami/missions.png'
    ],
    videos: [],
    challenges: 'Exposer une interface de contrôle complète (terminal, bureau distant, lancement d\'outils offensifs) depuis un mobile sans jamais l\'exposer sur le réseau public, tout en gardant une latence utilisable en conditions réelles.',
    solutions: 'Toute communication transite exclusivement par le tunnel VPN vers le daemon FastAPI : appairage par JWT à usage unique, verrouillage biométrique côté app, sudoers restreints côté hôte (moindre privilège) et journal d\'audit consultable. Les 6 jalons de la roadmap V1 sont livrés et testés en conditions réelles (backend + application Android, via Tailscale).'
  },
  {
    id: 'cybergram',
    title: 'CYBERGRAM',
    description: 'Plateforme de veille automatisée en cybersécurité avec génération d\'articles par IA. Agrégation de sources, analyse et publication automatique.',
    technologies: ['Node.js', 'Python', 'IA', 'API REST', 'MongoDB'],
    year: 2025,
    link: '#',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    category: 'Cybersécurité',
    detailedDescription: 'CYBERGRAM est une plateforme innovante de veille automatisée en cybersécurité qui utilise l\'intelligence artificielle pour générer des articles pertinents à partir de sources variées. Le système agrège automatiquement les informations de plusieurs flux RSS, sites d\'actualités techniques et bulletins de sécurité, puis les analyse pour produire des résumés structurés et des analyses approfondies.',
    features: [
      'Agrégation automatique de sources d\'information en cybersécurité',
      'Analyse sémantique avec traitement du langage naturel',
      'Génération d\'articles par IA avec différents niveaux de détail',
      'Classification des articles par catégories de menace',
      'Publication automatisée sur les réseaux sociaux et newsletters'
    ],
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop'
    ],
    videos: [],
    challenges: 'Le principal défi était d\'implémenter un système d\'analyse sémantique capable de distinguer les informations pertinentes des bruits informationnels, tout en maintenant une génération de contenu de qualité constante.',
    solutions: 'Nous avons développé un pipeline de traitement NLP personnalisé combiné à un modèle de classification multi-catégorie pour assurer la pertinence des articles générés.'
  },
  {
    id: 'hackpen',
    title: 'HackPen',
    description: 'Plateforme de test de pénétration sous Linux. Environnement sécurisé pour l\'apprentissage et la pratique des techniques de pentesting.',
    technologies: ['Python', 'Linux', 'Bash', 'Docker', 'Nmap'],
    year: 2025,
    link: '#',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    category: 'Pentesting',
    detailedDescription: 'HackPen est une plateforme d\'apprentissage interactive conçue pour former les professionnels de la cybersécurité aux techniques de test de pénétration. Basée sur Linux, elle fournit un environnement isolé et sécurisé où les utilisateurs peuvent pratiquer légalement diverses méthodes de pentesting.',
    features: [
      'Environnement Linux sandboxé pour des tests sécurisés',
      'Laboratoires pratiques avec différents niveaux de difficulté',
      'Suivi des progrès et système de badges',
      'Intégration de Docker pour des scénarios réalistes',
      'Outils préinstallés de pentesting (Nmap, Metasploit, Burp Suite)'
    ],
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop'
    ],
    videos: [],
    challenges: 'La création d\'un environnement à la fois réaliste et sécurisé représentait un défi technique majeur, notamment en matière d\'isolation des ressources et de prévention des fuites potentielles.',
    solutions: 'Nous avons mis en place une architecture basée sur Docker avec des conteneurs éphémères et des politiques de sécurité strictes pour garantir l\'intégrité de la plateforme.'
  },
  {
    id: 'indrawatch',
    title: 'IndraWatch',
    description: 'Global Web Observability & Intelligence Platform — monitoring, sécurité, performance et intelligence des sites web, avec détection d\'incidents et AI Analyst.',
    technologies: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Playwright', 'Nuxt 4', 'Docker'],
    year: 2026,
    link: 'https://indrawatch.com',
    image: '/media/projects/indrawatch/logo.png',
    category: 'Observabilité',
    detailedDescription: 'Le monitoring classique se limite à répondre à « Est-ce que mon site est en ligne ? ». IndraWatch va plus loin et répond à : quel est l\'état réel de mon site, de mes services, de leurs performances, de leur sécurité et de leur expérience utilisateur ? Les 20 phases du backend (monitoring HTTP/API/SSL/DNS, incidents, sécurité/SEO, performance navigateur, détection de changements/anomalies, nœuds distribués, AI Analyst, pages de statut et rapports) sont implémentées et testées, avec une hiérarchie de rôles à 3 paliers (client/admin/super_admin). Le frontend (Nuxt 4) est en cours — la fondation est posée, les pages métier restent à construire.',
    features: [
      'Availability & API monitoring avec réduction des faux positifs',
      'Web Vitals (LCP, INP, CLS), Browser Monitoring (Playwright) et Synthetic Monitoring',
      'SSL/TLS et DNS Intelligence : validité, expiration, détection de changement',
      'Security & SEO Monitoring, Change & Anomaly Detection (fingerprinting de contenu)',
      'Health Score explicable par site, cycle de vie d\'incidents avec timeline corrélée',
      'AI Analyst : explication des incidents avec niveau de confiance, jamais d\'analyse simulée',
      'Pages de statut publiques et rapports périodiques (dashboard, PDF)'
    ],
    images: [
      '/media/projects/indrawatch/logo.png'
    ],
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
    image: '/media/projects/gatekeeper/dashboard.png',
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
      '/media/projects/gatekeeper/dashboard.png',
      '/media/projects/gatekeeper/requests-list.png',
      '/media/projects/gatekeeper/request-form.png',
      '/media/projects/gatekeeper/request-types.png'
    ],
    videos: [],
    challenges: 'Concevoir un moteur de workflow d\'approbation assez générique pour s\'adapter à des dizaines de types de demandes différents (accès, matériel, visiteurs...) sans coder un cas particulier par type, tout en garantissant une base fiable et testée sur le cœur métier.',
    solutions: 'Architecture en Clean Architecture avec formulaires dynamiques par schéma JSON et moteur de workflow découplé du contenu métier. Le cœur (domaine/application) est en mypy strict avec une couverture de tests maintenue au-dessus de 80 %, complété par Ruff (dont les règles de sécurité bandit) sur l\'ensemble du backend.'
  }
];
