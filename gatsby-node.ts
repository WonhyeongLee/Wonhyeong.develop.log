import path from 'path';

import { GatsbyNode, CreateNodeArgs, CreateWebpackConfigArgs } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import _ from 'lodash';

// Define the template for blog post
const blogPost = path.resolve(`src/templates/blog-post.tsx`);
const TagPageTemplete = path.resolve(`src/templates/tags.tsx`);

exports.onCreateWebpackConfig = ({
  getConfig,
  actions
}: CreateWebpackConfigArgs) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        types: path.resolve(__dirname, 'src/types'),
        styles: path.resolve(__dirname, 'src/styles'),
        pages: path.resolve(__dirname, 'src/pages'),
        templates: path.resolve(__dirname, 'src/templates'),
        context: path.resolve(__dirname, 'src/context'),
        images: path.resolve(__dirname, 'src/images')
      }
    }
  });
};

interface Data {
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
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode
}: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter
}) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  const result = await graphql<Data>(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      postsRemark: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data?.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts && posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId
        }
      });
    });
  }
  const tags = result.data?.tagsGroup.group;
  if (tags) {
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: TagPageTemplete,
        context: {
          tag: tag.fieldValue
        }
      });
    });
  }
};
