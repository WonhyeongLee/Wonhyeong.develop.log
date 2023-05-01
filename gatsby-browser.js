import React from "react"
// custom typefaces
import "@fontsource/montserrat/variable.css"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"
// import Layout from "./src/components/layout"
import TagProvider from "./src/context/TagProvider"

export const wrapRootElement = ({ element }) => {
  return <TagProvider>{element}</TagProvider>
}

// export const wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>
// }
