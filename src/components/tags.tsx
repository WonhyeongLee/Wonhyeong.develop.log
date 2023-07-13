import { css } from '@emotion/react';
import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../app/store';
import { selectTag } from '../features/tags/tagsSlice';

const hoverAndSelectedTagStyle = css`
  font-weight: var(--fontWeight-bold);
  color: #f31010;
  background-color: #e0e0e0;
`;

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
`;
const selectedTagStyle = css`
  ${hoverAndSelectedTagStyle}
`;

type TagProps = {
  tag: string;
};

const Tag = ({ tag }: TagProps) => {
  const selectedTags = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <Link
      to={`/`}
      css={selectedTags.includes(tag) ? [tagStyle, selectedTagStyle] : tagStyle}
      onClick={event => {
        if (location.pathname === '/') {
          event.preventDefault();
        }
        // setSelectedTags(tag);
        dispatch(selectTag(tag));
      }}
    >
      {tag}
    </Link>
  );
};

export default Tag;
