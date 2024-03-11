import { Link, graphql, PageProps } from 'gatsby';

import { articleBodyStyle, blogPostNavStyle, navBoxStyle } from './styles';
import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Tag from '../components/tags';

const BlogPostTemplate = ({
  data,
  location,
}: PageProps<Queries.BlogPostTemplateQuery>): JSX.Element => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const post = data.markdownRemark;
  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
          <p>{post?.frontmatter?.date}</p>
          {post?.frontmatter?.tags && (
            <div>
              {post?.frontmatter?.tags.map(tag => (
                <Tag key={tag} tag={tag || ''} />
              ))}
            </div>
          )}
        </header>
        <section
          css={articleBodyStyle}
          dangerouslySetInnerHTML={{ __html: post?.html || '' }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav css={blogPostNavStyle}>
        <ul>
          <li>
            {data.previous && (
              <div css={navBoxStyle}>
                <span>이전 게시물</span>
                <Link to={data.previous?.fields?.slug || ''} rel="prev">
                  ← {data.previous?.frontmatter?.title}
                </Link>
              </div>
            )}
          </li>
          <li>
            {data.next && (
              <div css={navBoxStyle}>
                <span>다음 게시물</span>
                <Link to={data.next?.fields?.slug || ''} rel="next">
                  {data.next?.frontmatter?.title} →
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export const Head = ({
  data,
}: PageProps<Queries.BlogPostTemplateQuery>): JSX.Element => {
  const post = data.markdownRemark;
  return (
    <Seo
      title={post?.frontmatter?.title || ''}
      description={post?.frontmatter?.description || post?.excerpt || ''}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostTemplate(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
