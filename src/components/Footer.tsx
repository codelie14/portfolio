import { motion } from 'framer-motion';
import { Terminal, Heart, Github, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50 bg-card/30">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#accueil"
            className="flex items-center gap-2 text-lg font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Terminal className="w-5 h-5 text-primary" />
            <span className="gradient-text">Archange Elie Yatte</span>
          </motion.a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Fait avec
            <Heart className="w-4 h-4 text-primary inline-block animate-pulse" />
            par Archange Elie Yatte
          </p>

          {/* Quick Links */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="https://github.com/codelie14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/archange-yatte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/codelie14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
