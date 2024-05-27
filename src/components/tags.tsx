import { css } from '@emotion/react';
import { Link, navigate } from 'gatsby';

import { resetTags, selectTag } from '@redux/features/tags/tagsSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RootState } from '@redux/rootReducer';

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
  totalCount?: number;
};

const Tag = ({ tag, totalCount }: TagProps): JSX.Element => {
  const selectedTags = useAppSelector((state: RootState) => state.tags.selectedTags);
  const dispatch = useAppDispatch();

  const handleTagClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (tag === 'All') {
      dispatch(resetTags());
      navigate('/');
    } else {
      dispatch(selectTag(tag));
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag];
      const queryParams = newTags.length > 0 ? newTags.map(t => `tag=${t}`).join('&') : '';
      navigate(queryParams ? `/?${queryParams}` : '/');
    }
  };

  return (
    <Link
      to={`/`}
      css={selectedTags.includes(tag) ? [tagStyle, selectedTagStyle] : tagStyle}
      onClick={handleTagClick}
    >
      {tag} {totalCount !== undefined && `(${totalCount})`}
    </Link>
  );
};

export default Tag;
