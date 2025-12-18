import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'CYBERGRAM',
    description: 'Plateforme de veille automatisée en cybersécurité avec génération d\'articles par IA. Agrégation de sources, analyse et publication automatique.',
    technologies: ['Node.js', 'Python', 'IA', 'API REST', 'MongoDB'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    category: 'Cybersécurité'
  },
  {
    title: 'HackPen',
    description: 'Plateforme de test de pénétration sous Linux. Environnement sécurisé pour l\'apprentissage et la pratique des techniques de pentesting.',
    technologies: ['Python', 'Linux', 'Bash', 'Docker', 'Nmap'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    category: 'Pentesting'
  },
  {
    title: 'WSAS',
    description: 'Web Security Attack Simulator - Plateforme éducative pour comprendre et tester les vulnérabilités Web XSS et CSRF dans un environnement 100% sécurisé.',
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML/CSS'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    category: 'Éducatif'
  },
  {
    title: 'Plateforme Artisans Ivoiriens',
    description: 'Plateforme web sécurisée pour les artisans ivoiriens. Sécurisation complète avec chiffrement bcrypt, protection anti-injections SQL et contrôles d\'accès.',
    technologies: ['PHP', 'MySQL', 'Apache', 'bcrypt', 'PDO'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'E-commerce'
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projets" className="py-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      <div className="relative section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            // Mes réalisations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projets<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une sélection de projets qui démontrent mes compétences en développement 
            et en cybersécurité.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {/* More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/codelie14"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <span>Voir plus sur GitHub</span>
            <span className="text-primary">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
