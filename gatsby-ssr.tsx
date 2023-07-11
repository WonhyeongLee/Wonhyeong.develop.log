// const Layout = require("./src/components/layout")
import type { GatsbySSR } from 'gatsby';

import TagProvider from './src/context/TagProvider';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes
}) => setHtmlAttributes({ lang: 'en' });

export const wrapRootElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return <TagProvider>{element}</TagProvider>;
};

// exports.wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }
