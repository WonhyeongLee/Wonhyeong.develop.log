export type FeedQueryResult = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      site_url: string;
    };
  };
  allMarkdownRemark: {
    nodes: {
      excerpt: string;
      html: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        date: string;
      };
    }[];
  };
};
