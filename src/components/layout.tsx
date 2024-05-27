import { ReactNode } from 'react';

import { Link, useStaticQuery, graphql } from 'gatsby';
import { Transition } from 'react-transition-group';

import Tag from '@components/tags';
import { resetTags, toggleTagListVisibility } from '@redux/features/tags/tagsSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
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

const Layout = ({ location, title, children }: LayoutProps): JSX.Element => {
  const data: Queries.AllTagsQuery = useStaticQuery(graphql`
    query AllTags {
      allMdx(limit: 1000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  const tags = data.allMdx.group;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const dispatch = useAppDispatch();
  const isTagListVisible = useAppSelector(state => state.tags.isTagListVisible);

  const handleResetTags = () => {
    dispatch(resetTags());
  };

  const handleToggleTagListVisibility = () => {
    dispatch(toggleTagListVisibility());
  };
  let header;
  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/" onClick={handleResetTags}>
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/" onClick={handleResetTags}>
        {title}
      </Link>
    );
  }

  return (
    <>
      <header css={globalHeaderStyle}>
        {header}
        <div>
          <button onClick={handleToggleTagListVisibility}>tags</button>
        </div>
      </header>
      <main css={mainWrapperStyle} className={isTagListVisible ? 'slideDown' : 'slideUp'}>
        <Transition in={isTagListVisible} timeout={300} unmountOnExit>
          {state => (
            <div css={tagsListStyle(state)}>
              <Tag key="All" tag="All" />
              {tags.map(tag => (
                <Tag key={tag.fieldValue} tag={tag.fieldValue || ''} totalCount={tag.totalCount} />
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
