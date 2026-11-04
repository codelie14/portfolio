import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useTr } from '@/i18n';

const NotFound = () => {
  const tr = useTr();
  return (
    <main className="min-h-screen grid place-items-center bg-background px-6 text-center">
      <SEO title={tr('Page introuvable — Archange Elie Yatte', 'Page not found — Archange Elie Yatte')} noindex />
      <div>
        <p className="font-mono text-primary text-sm">HTTP 404 · ACCESS_DENIED</p>
        <h1 className="mt-4 font-display font-bold text-[clamp(4rem,18vw,12rem)] leading-none text-stroke">404</h1>
        <p className="mt-6 text-muted-foreground">{tr("Cette page n'existe pas, ou vous n'avez pas les droits. 🙂", "This page doesn't exist, or you don't have the rights. 🙂")}</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
          {tr("Retour à l'accueil", 'Back to home')}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
