import { ReactNode, useContext, useState } from 'react';

import { Link, useStaticQuery, graphql } from 'gatsby';
import { Transition } from 'react-transition-group';

import Tag from '@components/tags';
import TagContext from '@context/TagContext';
import {
  globalHeaderStyle,
  mainWrapperStyle,
  footerStyle,
  linkStyle,
  tagsListStyle,
} from '@styles/style';

type LayoutProps = {
  location: Location;
  title: string;
  children: ReactNode;
};

type TagsQueryResult = {
  allMarkdownRemark: {
    group: {
      fieldValue: string;
    }[];
  };
};

const Layout = ({ location, title, children }: LayoutProps): JSX.Element => {
  const [isTagListVisible, setIsTagListVisible] = useState(true);
  const { resetSelectedTags } = useContext(TagContext);

  const data: TagsQueryResult = useStaticQuery(graphql`
    query TagsQuery {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);
  const tags = data.allMarkdownRemark.group;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/" onClick={resetSelectedTags}>
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/" onClick={resetSelectedTags}>
        {title}
      </Link>
    );
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
      <main
        css={mainWrapperStyle}
        className={isTagListVisible ? 'slideDown' : 'slideUp'}
      >
        <Transition in={isTagListVisible} timeout={300} unmountOnExit>
          {state => (
            <div css={tagsListStyle(state)}>
              <Tag key="All" tag="All" />
              {tags.map(tag => (
                <Tag key={tag.fieldValue} tag={tag.fieldValue} />
              ))}
            </div>
          )}
        </Transition>
        {children}
      </main>
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
  );
};

export default Layout;
