import path from 'path';

import { GatsbyNode, CreateNodeArgs, CreateWebpackConfigArgs } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
// import _ from 'lodash';

const blogPost = path.resolve(`src/templates/PostTemplate.tsx`);
// const TagPageTemplete = path.resolve(`src/templates/tags.tsx`);

exports.onCreateWebpackConfig = ({ getConfig, actions }: CreateWebpackConfigArgs) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      // modules: [path.resolve(__dirname, 'plugins'), 'node_modules'],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@redux': path.resolve(__dirname, 'src/redux'),
        '@features': path.resolve(__dirname, 'src/redux/features'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@types': path.resolve(__dirname, 'src/types'),
      },
    },
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql<Queries.BlogPostsDataQuery>(`
    query BlogPostsData {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
            category
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }

  const mdxPosts = result.data?.allMdx.nodes || [];

  if (mdxPosts.length > 0) {
    mdxPosts.forEach((node, index) => {
      const previousPostId = index === 0 ? null : mdxPosts[index - 1].id;
      const nextPostId = index === mdxPosts.length - 1 ? null : mdxPosts[index + 1].id;

      createPage({
        path: node.fields?.slug || '',
        component: `${blogPost}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
          previousPostId,
          nextPostId,
          tags: node.frontmatter?.tags,
          category: node.frontmatter?.category,
          type: 'mdx',
        },
      });
    });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      github: String
      email: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      excerpt(pruneLength: Int = 140): String
      fields: Fields
      html: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      excerpt(pruneLength: Int = 140): String
      fields: Fields
      body: String
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
      category: String
    }

    type Fields {
      slug: String
    }
  `);
};
