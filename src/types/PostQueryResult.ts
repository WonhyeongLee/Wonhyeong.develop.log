export type PostQueryResult = {
  allMarkdownRemark: {
    nodes: {
      id: string;
      fields: {
        slug: string;
      };
    }[];
  };
  postsRemark: {
    edges: {
      node: {
        fields: {
          slug: string;
        };
        frontmatter: {
          tags: string[];
        };
      };
    }[];
  };
  tagsGroup: {
    group: {
      fieldValue: string;
    }[];
  };
};
