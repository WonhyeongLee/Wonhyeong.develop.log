import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { socialIconListStyle, socialIconStyle } from '@styles/style';

type BioQueryResult = {
  site: {
    siteMetadata: {
      author: {
        name: string;
        summary: string;
      };
      social: {
        email: string;
        github: string;
      };
      description: string;
    };
  };
};

const Bio = (): JSX.Element => {
  const data = useStaticQuery<BioQueryResult>(graphql`
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
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;
  const description = data.site.siteMetadata?.description;

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={['auto', 'webp', 'avif']}
        src="../images/profile-pic.jpg"
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
            <a href={`${social?.github || ``}`} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} css={socialIconStyle} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
