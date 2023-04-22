import * as React from "react"
import { Link } from "gatsby"

import {
  globalHeaderStyle,
  globalMainWrapperStyle,
  footerStyle,
  linkStyle,
} from "./styles"

const Layout = ({ location, title, children }) => {
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
          <Link to="/tags">tags</Link>
        </div>
      </header>
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
