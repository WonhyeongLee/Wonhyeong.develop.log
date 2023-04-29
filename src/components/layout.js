import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Tag from "./tags"

import {
  globalHeaderStyle,
  globalMainWrapperStyle,
  footerStyle,
  linkStyle,
  tagsListStyle,
} from "../styles/style.js"

const Layout = ({ location, title, children }) => {
  const [isTagListVisible, setIsTagListVisible] = React.useState(false)

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  const tags = data.allMarkdownRemark.group
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <>
      <header css={globalHeaderStyle}>
        {header}
        <div>
          <button onClick={() => setIsTagListVisible(!isTagListVisible)}>
            tags
          </button>
        </div>
      </header>
      {isTagListVisible && (
        <div css={tagsListStyle(isTagListVisible)}>
          {tags.map(tag => (
            <Tag key={tag.fieldValue} tag={tag.fieldValue} />
          ))}
        </div>
      )}
      <main css={globalMainWrapperStyle}>{children}</main>
      <footer css={footerStyle}>
        <p>© Wonhyeong's Log</p>
        <p>
          {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com" css={linkStyle}>
            Gatsby
          </a>
        </p>
      </footer>
    </>
  )
}

export default Layout
