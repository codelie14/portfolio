import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { projects } from '@/data';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the project by ID
    const foundProject = projects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      // If project not found, redirect to projects page
      navigate('/#projets');
    }
    
    setLoading(false);
  }, [projectId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back Button */}
      <div className="section-container py-8">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Retour aux projets</span>
        </motion.button>
      </div>

      {/* Project Detail */}
      <div className="section-container pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 text-sm font-mono bg-primary/10 text-primary rounded-full border border-primary/20">
                {project.category}
              </span>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" />
                <span>2025</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Voir le projet</span>
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code source</span>
              </a>
            </div>
          </div>

          {/* Main Image */}
          <div className="mb-12 rounded-xl overflow-hidden glass-card">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Detailed Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-invert max-w-none mb-12">
                <h2 className="text-2xl font-bold mb-4">Description détaillée</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.detailedDescription}
                </p>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Fonctionnalités principales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 glass-card rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="glass-card p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-destructive">Défis techniques</h3>
                  <p className="text-muted-foreground">
                    {project.challenges}
                  </p>
                </div>
                <div className="glass-card p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-accent">Solutions implémentées</h3>
                  <p className="text-muted-foreground">
                    {project.solutions}
                  </p>
                </div>
              </div>

              {/* Gallery */}
              {(project.images.length > 1 || project.videos.length > 0) && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Galerie</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.slice(1).map((image: string, index: number) => (
                      <div key={index} className="rounded-lg overflow-hidden glass-card">
                        <img
                          src={image}
                          alt={`${project.title} ${index + 2}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                    {project.videos.map((video: string, index: number) => (
                      <div key={index} className="rounded-lg overflow-hidden glass-card aspect-video flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-primary"></div>
                          </div>
                          <p className="text-muted-foreground">Vidéo démonstration</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card p-6 rounded-lg sticky top-8">
                <h3 className="text-lg font-bold mb-4">Technologies utilisées</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-mono bg-secondary/50 text-muted-foreground rounded border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold mb-4">Catégorie</h3>
                <div className="flex items-center gap-2 mb-6">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{project.category}</span>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Voir le projet</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}