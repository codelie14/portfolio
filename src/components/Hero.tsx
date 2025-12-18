import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Twitter, ChevronDown, Shield, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 text-primary/20 hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Shield className="w-24 h-24" />
      </motion.div>

      <div className="relative section-container py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-mono text-primary">
              Disponible pour de nouvelles opportunités
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-foreground">Archange Elie</span>{' '}
            <span className="gradient-text glow-text">Yatte</span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
              Développeur Full-Stack{' '}
              <span className="text-primary">&</span>{' '}
              Analyste Cybersécurité
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Passionné par la cybersécurité et le développement d'applications sécurisées. 
            Je conçois des solutions innovantes pour protéger et optimiser les systèmes informatiques.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button variant="cyber" size="xl" asChild>
              <a href="/public/media/CV_YATTE_ARCHANGE.pdf" download className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Télécharger mon CV
              </a>
            </Button>
            <Button variant="cyber-outline" size="xl" asChild>
              <a href="#contact">Me contacter</a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Github, href: 'https://github.com/codelie14', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/archange-yatte', label: 'LinkedIn' },
              { icon: Facebook, href: 'https://facebook.com/archange-yatte', label: 'Facebook' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#apropos"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-mono">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
