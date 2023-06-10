import React, { useContext } from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { css, cx } from "@emotion/css"
import TagContext from "../context/TagContext"

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
  background-color: #dee2e6;
  font-size: 14px;
  text-decoration: none;
  color: #333;
  &:hover {
    font-weight: var(--fontWeight-bold);
    color: #f31010;
    background-color: #e0e0e0;
  }
`

const Tag = ({ tag }) => {
  const { setSelectedTag } = useContext(TagContext)

  return (
    <Link
      to={`/tags/${kebabCase(tag)}`}
      className={cx(tagStyle)}
      onClick={event => {
        event.preventDefault()
        setSelectedTag(tag)
      }}
    >
      {tag}
    </Link>
  )
}

export default Tag
