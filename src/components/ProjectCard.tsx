import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
  category: string;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative glass-card overflow-hidden project-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Badge */}
        <span className="absolute top-4 left-4 z-20 px-3 py-1 text-xs font-mono bg-primary/90 text-primary-foreground rounded-full">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Folder className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </motion.a>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View project"
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </motion.a>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-secondary/50 text-muted-foreground rounded border border-border/50 hover:border-primary/30 hover:text-primary transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>
    </motion.div>
  );
}
