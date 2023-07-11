import { Global, css } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { GatsbyBrowser } from 'gatsby';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import * as React from 'react';

import TagProvider from './src/context/TagProvider';
import { globalStyles } from './src/styles/globalStyles';
import { globalVariables } from './src/styles/globalVariables';
// custom typefaces
import '@fontsource/montserrat';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/merriweather';
// custom CSS styles
import './src/style.css';
// Highlighting for code blocks
import 'prismjs/themes/prism.css';
// import Layout from "./src/components/layout"

//SSG에서 Font Awesome 스타일이 head에 추가되는 시점을 조정
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element
}) => {
  return (
    <>
      <Global
        styles={css`
          ${globalVariables}
          ${globalStyles}
        `}
      />
      <TagProvider>{element}</TagProvider>
    </>
  );
};

// export const wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }