export const projects = [
  {
    id: 'cybergram',
    title: 'CYBERGRAM',
    description: 'Plateforme de veille automatisée en cybersécurité avec génération d\'articles par IA. Agrégation de sources, analyse et publication automatique.',
    technologies: ['Node.js', 'Python', 'IA', 'API REST', 'MongoDB'],
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
    id: 'wsas',
    title: 'WSAS',
    description: 'Web Security Attack Simulator - Plateforme éducative pour comprendre et tester les vulnérabilités Web XSS et CSRF dans un environnement 100% sécurisé.',
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML/CSS'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    category: 'Éducatif',
    detailedDescription: 'WSAS (Web Security Attack Simulator) est une plateforme éducative interactive qui permet de comprendre et de tester les vulnérabilités Web les plus courantes dans un environnement contrôlé. Les utilisateurs peuvent expérimenter des attaques réelles de type XSS et CSRF sans risque.',
    features: [
      'Scénarios d\'attaque XSS et CSRF réalistes',
      'Explications détaillées des vulnérabilités',
      'Interface interactive pour tester les attaques',
      'Mesures de protection démonstratives',
      'Guide pas-à-pas pour la sécurisation'
    ],
    images: [
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop'
    ],
    videos: [],
    challenges: 'Concevoir une plateforme qui soit à la fois éducative et sécurisée sans compromettre l\'authenticité des scénarios d\'attaque.',
    solutions: 'Implémentation d\'un système de sandboxing côté serveur avec des restrictions strictes sur les entrées utilisateur et des mécanismes de nettoyage automatique.'
  },
  {
    id: 'artisans-ivoiriens',
    title: 'Plateforme Artisans Ivoiriens',
    description: 'Plateforme web sécurisée pour les artisans ivoiriens. Sécurisation complète avec chiffrement bcrypt, protection anti-injections SQL et contrôles d\'accès.',
    technologies: ['PHP', 'MySQL', 'Apache', 'bcrypt', 'PDO'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'E-commerce',
    detailedDescription: 'La Plateforme Artisans Ivoiriens est une solution e-commerce complète conçue spécifiquement pour les artisans et créateurs locaux de Côte d\'Ivoire. Elle offre un espace sécurisé pour vendre leurs produits tout en mettant en valeur leur savoir-faire traditionnel.',
    features: [
      'Interface de gestion de produits intuitive',
      'Système de paiement sécurisé intégré',
      'Gestion des commandes et du stock',
      'Profils vendeurs personnalisables',
      'Système d\'évaluation et de commentaires'
    ],
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    ],
    videos: [],
    challenges: 'Assurer une sécurité maximale des données sensibles (informations de paiement, données personnelles) tout en maintenant une interface utilisateur simple et accessible.',
    solutions: 'Mise en œuvre d\'une architecture sécurisée avec chiffrement bcrypt, requêtes préparées PDO, validation côté serveur et protection CSRF.'
  }
];