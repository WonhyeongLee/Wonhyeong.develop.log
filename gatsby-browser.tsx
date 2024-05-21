import { Global, css } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { GatsbyBrowser } from 'gatsby';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { Provider } from 'react-redux';

import { store } from '@app/store';
import { globalStyles } from '@styles/globalStyles';
import { globalVariables } from '@styles/globalVariables';
// custom typefaces
import '@fontsource/noto-sans-kr';
import '@fontsource/noto-sans-kr/700.css';
import '@fontsource/noto-sans-kr/900.css';
// custom CSS styles
import './src/style.css';
// Highlighting for code blocks
import 'prismjs/themes/prism.css';
// import Layout from "./src/components/layout"

//SSG에서 Font Awesome 스타일이 head에 추가되는 시점을 조정
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return (
    <>
      <Global
        styles={css`
          ${globalVariables}
          ${globalStyles}
        `}
      />
      <Provider store={store}>{element}</Provider>;
    </>
  );
};

// export const wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }
