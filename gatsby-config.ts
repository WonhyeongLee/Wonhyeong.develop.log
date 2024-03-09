import { GatsbyConfig } from 'gatsby';

import { FeedQueryResult } from './src/types/FeedQueryResult';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Wonhyeong's log`,
    author: {
      name: `이원형`,
    },
    description: `기록하기 위한 공간`,
    siteUrl: `https://wonhyeong.netlify.app/`,
    social: {
      github: `https://github.com/WonhyeongLee`,
      email: `kkwon9607@gmail.com`,
    },
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-mdx',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `React`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@src': 'src',
          '@app': 'src/app',
          '@components': 'src/components',
          '@context': 'src/context',
          '@features': 'src/features',
          '@images': 'src/images',
          '@layouts': 'src/layouts',
          '@pages': 'src/pages',
          '@styles': 'src/styles',
          '@templates': 'src/templates',
          '@types': 'src/types',
          '@posts': 'content/posts',
        },
        extensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-gifs`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: [`styles.ts`],
      },
    },
    `gatsby-plugin-fix-fouc`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark },
            }: {
              query: FeedQueryResult;
            }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `{
              allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: '/rss.xml',
            title: 'Gatsby Starter Blog RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
};

export default config;
