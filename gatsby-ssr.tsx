// const Layout = require("./src/components/layout")
import type { GatsbySSR } from 'gatsby';
import { Provider } from 'react-redux';

import { store } from '@redux/store';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHtmlAttributes }) =>
  setHtmlAttributes({ lang: 'ko' });

export const wrapRootElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};

// exports.wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }
