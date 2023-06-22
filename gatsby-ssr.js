/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
// const Layout = require("./src/components/layout")
import React from 'react';

import TagProvider from './src/context/TagProvider';

export function onRenderBody({ setHtmlAttributes }) {
  setHtmlAttributes({ lang: `en` });
}

export function wrapRootElement({ element }) {
  return <TagProvider>{element}</TagProvider>;
}

// exports.wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }
