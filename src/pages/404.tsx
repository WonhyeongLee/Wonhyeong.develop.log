import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';

const NotFoundPage = ({ data, location }: PageProps<Queries.NotFoundPageQuery>): JSX.Element => {
  const siteTitle = data.site?.siteMetadata?.title;

  return (
    <Layout location={location} title={siteTitle || ''}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export const Head = (): JSX.Element => <Seo title="404: Not Found" />;

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
