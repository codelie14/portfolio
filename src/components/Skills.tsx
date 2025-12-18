import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, Shield, Wrench, Database, Terminal, 
  Globe, Server, Lock, Palette, GitBranch 
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Développement',
    icon: Code2,
    color: 'primary',
    skills: [
      { name: 'Next.js / React', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'PHP', level: 70 },
      { name: 'TypeScript', level: 80 },
    ]
  },
  {
    title: 'Cybersécurité',
    icon: Shield,
    color: 'accent',
    skills: [
      { name: 'Wireshark', level: 75 },
      { name: 'Nmap', level: 80 },
      { name: 'Linux Security', level: 85 },
      { name: 'Sécurité Web', level: 80 },
      { name: 'Pentesting', level: 70 },
    ]
  },
  {
    title: 'Outils & DevOps',
    icon: Wrench,
    color: 'primary',
    skills: [
      { name: 'Git / GitHub', level: 85 },
      { name: 'MySQL / PostgreSQL', level: 75 },
      { name: 'Figma', level: 65 },
      { name: 'VS Code', level: 90 },
    ]
  }
];

const techIcons = [
  { icon: Terminal, label: 'CLI' },
  { icon: Database, label: 'Database' },
  { icon: Server, label: 'Backend' },
  { icon: Globe, label: 'Web' },
  { icon: Lock, label: 'Security' },
  { icon: GitBranch, label: 'Git' },
  { icon: Palette, label: 'Design' },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs font-mono text-primary">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="competences" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="relative section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">
            // Mes compétences
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expertise<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un ensemble de compétences techniques acquises à travers ma formation 
            et mes projets professionnels.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Tech Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-16 flex-wrap"
        >
          {techIcons.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default group"
            >
              <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + catIndex * 0.1 }}
              className="glass-card p-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${category.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'}`}>
                  <category.icon className={`w-6 h-6 ${category.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
                </div>
                <h3 className="text-lg font-bold">{category.title}</h3>
              </div>

              {/* Skills */}
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.5 + catIndex * 0.1 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
