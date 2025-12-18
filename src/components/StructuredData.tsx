import { Helmet } from 'react-helmet-async';

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    position: string;
  };
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  url,
  sameAs = [],
  worksFor
}: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    sameAs,
    ...(worksFor && {
      worksFor: {
        '@type': 'Organization',
        name: worksFor.name,
        jobTitle: worksFor.position
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export function OrganizationSchema({
  name,
  description,
  url,
  logo,
  sameAs = []
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    ...(logo && { logo }),
    sameAs
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface WebSiteSchemaProps {
  name: string;
  description: string;
  url: string;
  publisher: {
    '@type': string;
    name: string;
  };
}

export function WebSiteSchema({
  name,
  description,
  url,
  publisher
}: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    publisher
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}