import * as React from 'react';

import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps {
  description?: string;
  title: string;
  children?: React.ReactNode;
}

interface SiteMetadata {
  title: string;
  description: string;
}

interface StaticQueryResult {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const Seo = ({ description, title, children }: SeoProps): JSX.Element => {
  const { site }: StaticQueryResult = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      {children}
    </>
  );
};

export default Seo;
