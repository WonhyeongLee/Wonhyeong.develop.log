import { Global, css } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import * as normalize from 'normalize.css';
import React from 'react';
// normalize with emotion

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

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
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
