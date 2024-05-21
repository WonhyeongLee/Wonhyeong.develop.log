import { css } from '@emotion/react';
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
  margin: 5px 5px;
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

const Tag = ({ tag }: TagProps): JSX.Element => {
  const selectedTags = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch();

  return (
    <Link
      to={`/`}
      css={selectedTags.includes(tag) ? [tagStyle, selectedTagStyle] : tagStyle}
      onClick={event => {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
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
