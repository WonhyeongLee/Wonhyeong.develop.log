/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { StaticImage } from "gatsby-plugin-image"
import { socialIconListStyle, socialIconStyle } from "../styles/style"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            email
            github
          }
          description
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const description = data.site.siteMetadata?.description

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={128}
        height={128}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <div>
          <p>
            안녕하세요 <strong>{author.name}</strong> 입니다.
          </p>
          <p>{description}</p>
          <div css={socialIconListStyle}>
            <a href={`${social?.github || ``}`} target="_blank">
              <FontAwesomeIcon
                icon={faGithub}
                size="2xl"
                css={socialIconStyle}
              />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio
