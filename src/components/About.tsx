import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Shield, Globe, User } from 'lucide-react';

const skills = [
  'Next.js', 'Node.js', 'Python', 'PHP', 'TypeScript',
  'Wireshark', 'Nmap', 'Linux', 'MySQL'
];

const highlights = [
  {
    icon: Code2,
    title: 'Développement',
    description: 'Applications web full-stack sécurisées'
  },
  {
    icon: Shield,
    title: 'Cybersécurité',
    description: 'Analyse de vulnérabilités & pentesting'
  },
  {
    icon: Globe,
    title: 'Langues',
    description: 'Français (natif), Anglais (intermédiaire)'
  }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="apropos" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="relative section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            // À propos de moi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Qui suis-je<span className="text-primary">?</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-accent/10 rounded-2xl transform -rotate-3" />
              
              {/* Main Card */}
              <div className="relative glass-card p-8 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      {/* <User className="w-16 h-16 text-primary" /> */}
                      <img src="/public/media/photo-profile.png" alt="Archange Elie Yatte" className="rounded-full" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Archange Elie Yatte</h3>
                  <p className="text-muted-foreground font-mono text-sm">
                    @archangeyatte
                  </p>
                </div>

                {/* Terminal Style Info */}
                <div className="mt-8 p-4 bg-background/50 rounded-lg font-mono text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent">$</span>
                    <span className="text-muted-foreground">localisation</span>
                  </div>
                  <p className="text-foreground ml-4 mb-3">Grand-Bassam, Côte d'Ivoire</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent">$</span>
                    <span className="text-muted-foreground">education</span>
                  </div>
                  <p className="text-foreground ml-4">Licence Informatique & Science du Numérique</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Diplômé en Réseaux et Sécurité Informatique de l'Université Virtuelle de Côte d'Ivoire, 
              je me spécialise dans le développement d'applications sécurisées et l'analyse des vulnérabilités. 
              Mon objectif est de contribuer à des projets innovants tout en renforçant la protection 
              des systèmes contre les cybermenaces.
            </p>

            {/* Highlights */}
            <div className="grid gap-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Tags */}
            <div>
              <h4 className="text-sm font-mono text-primary mb-4">// Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                    className="px-3 py-1 text-sm font-medium bg-secondary border border-border rounded-full hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

