import { useMemo } from 'react';

import { Link, graphql, PageProps } from 'gatsby';
import { useSelector } from 'react-redux';

import { postTagsListStyle, postListStyle, footerStyle } from './styles';

import { RootState } from '@app/rootReducer';
import Bio from '@components/bio';
import Layout from '@components/layout';
import Seo from '@components/seo';
import Tag from '@components/tags';

const BlogIndex = ({
  data,
  location,
}: PageProps<Queries.BlogIndexQuery>): JSX.Element => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;
  const selectedTags = useSelector((state: RootState) => state.tags);

  const filteredPosts = useMemo(() => {
    if (!selectedTags.length || selectedTags.includes('All')) {
      return posts;
    }
    return posts.filter(post =>
      selectedTags.every(tag => post.frontmatter?.tags?.includes(tag))
    );
  }, [posts, selectedTags]);

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <hr></hr>
      <ol style={{ listStyle: `none` }}>
        {filteredPosts.map(post => {
          const title = post.frontmatter?.title || post.fields?.slug;
          return (
            <li key={post.fields?.slug}>
              <section
                css={postListStyle}
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields?.slug || ''} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter?.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        post.frontmatter?.description || post.excerpt || '',
                    }}
                    itemProp="description"
                  />
                </section>
                <footer css={footerStyle}>
                  {post.frontmatter?.tags && (
                    <ul css={postTagsListStyle} role="list">
                      {post.frontmatter.tags
                        .filter((tag): tag is string => tag !== null)
                        .map(tag => (
                          <li key={tag} role="list">
                            <Tag key={tag} tag={tag} />
                          </li>
                        ))}
                    </ul>
                  )}
                </footer>
              </section>
              <hr />
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = (): JSX.Element => <Seo title="All posts" />;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
      group(field: { frontmatter: { tags: SELECT } }) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
