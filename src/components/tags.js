import React, { useContext } from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { css } from "@emotion/react"
import TagContext from "../context/TagContext"

const hoverAndSelectedTagStyle = css`
  font-weight: var(--fontWeight-bold);
  color: #f31010;
  background-color: #e0e0e0;
`

const tagStyle = css`
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #dee2e6;
  font-size: 14px;
  text-decoration: none;
  color: #333;
  &:hover {
    ${hoverAndSelectedTagStyle}
  }
`
const selectedTagStyle = css`
  ${hoverAndSelectedTagStyle}
`

const Tag = ({ tag }) => {
  const { selectedTag, setSelectedTag } = useContext(TagContext)

  return (
    <Link
      to={`/tags/${kebabCase(tag)}`}
      css={tag === selectedTag ? [tagStyle, selectedTagStyle] : tagStyle}
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
