import { projects } from './index';
import { useLang } from '@/i18n';
import { projectsEn } from './en-data';

export { projectsEn };
export type Project = (typeof projects)[number];

/** Projets dans la langue active. */
export function useProjects(): Project[] {
  const { lang } = useLang();
  if (lang === 'fr') return projects;
  return projects.map((p) => ({ ...p, ...(projectsEn[p.id] ?? {}) }));
}
