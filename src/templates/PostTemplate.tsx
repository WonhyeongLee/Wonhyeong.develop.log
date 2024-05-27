import { MDXProvider } from '@mdx-js/react';
import { Link, graphql, PageProps } from 'gatsby';

import { articleBodyStyle, blogPostNavStyle, navBoxStyle } from './styles';
import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Tag from '../components/tags';

const shortcodes = { Link };
const BlogPostTemplate = ({
  data,
  location,
  children,
}: PageProps<Queries.BlogPostTemplateQuery> & { children: React.ReactNode }): JSX.Element => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const post = data.mdx;
  const previousPost = data.previousMdx;
  const nextPost = data.nextMdx;

  return (
    <Layout location={location} title={siteTitle}>
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
          <p>{post?.frontmatter?.date}</p>
          {post?.frontmatter?.tags && (
            <div>{post?.frontmatter?.tags.map(tag => <Tag key={tag} tag={tag || ''} />)}</div>
          )}
        </header>
        <section css={articleBodyStyle} itemProp="articleBody">
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav css={blogPostNavStyle}>
        <ul>
          <li>
            {previousPost && (
              <div css={navBoxStyle}>
                <span>이전 게시물</span>
                <Link to={previousPost?.fields?.slug || ''} rel="prev">
                  ← {previousPost?.frontmatter?.title}
                </Link>
              </div>
            )}
          </li>
          <li>
            {nextPost && (
              <div css={navBoxStyle}>
                <span>다음 게시물</span>
                <Link to={nextPost?.fields?.slug || ''} rel="next">
                  {nextPost?.frontmatter?.title} →
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export const Head = ({ data }: PageProps<Queries.BlogPostTemplateQuery>): JSX.Element => {
  const post = data.mdx;
  return (
    <Seo
      title={post?.frontmatter?.title || ''}
      description={post?.frontmatter?.description || post?.excerpt || ''}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostTemplate($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previousMdx: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    nextMdx: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
