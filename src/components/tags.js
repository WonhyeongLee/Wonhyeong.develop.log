import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { css, cx } from "@emotion/css"

// styled 방식
// import styled from "@emotion/styled"
// const StyledTag = styled(Link)`
//   display: inline-block;
//   margin: 0 5px;
//   padding: 5px 10px;
//   background-color: #f8f8f8;
//   border-radius: 20px;
//   font-size: 14px;
//   text-decoration: none;
//   color: #333;
//   &:hover {
//     background-color: #e0e0e0;
//   }
// `

const tagStyle = css`
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f8f8f8;
  border-radius: 20px;
  font-size: 14px;
  text-decoration: none;
  color: #333;
  &:hover {
    background-color: #e0e0e0;
  }
`

const Tag = ({ tag }) => (
  // <StyledTag to={`/tags/${kebabCase(tag)}`}>{tag}</StyledTag>
  <Link to={`/tags/${kebabCase(tag)}`} className={cx(tagStyle)}>
    {tag}
  </Link>
)

export default Tag
