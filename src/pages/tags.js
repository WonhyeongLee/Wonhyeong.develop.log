import React, { useState } from "react"
import TagPageTemplete from "../templates/tags"

// Components
import { graphql } from "gatsby"
import Seo from "../components/seo"
import Tag from "../components/tags"
import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  const [selectedTag, setSelectedTag] = useState(null)
  return (
    <Layout location={location} title={title}>
      <Seo title={title} />
      <div>
        <h1>Tags</h1>
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {group.map(tag => (
            <li
              key={tag.fieldValue}
              style={{
                display: "inline-block",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            >
              <button onClick={() => setSelectedTag(tag.fieldValue)}>
                <Tag tag={tag.fieldValue} /> ({tag.totalCount})
              </button>
            </li>
          ))}
        </ul>
        {selectedTag && <TagPageTemplete tag={selectedTag} />}
      </div>
    </Layout>
  )
}

export default TagsPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
