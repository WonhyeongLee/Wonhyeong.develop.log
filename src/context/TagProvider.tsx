import { FC, useState, ReactNode } from 'react';

import TagContext from './TagContext';

interface TagProviderProps {
  children: ReactNode;
}

const TagProvider: FC<TagProviderProps> = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['All']);

  const handleSetSelectedTag = (tag: string) => {
    setSelectedTags(prevSelectedTags => {
      if (tag === 'All') {
        return ['All'];
      }
      if (prevSelectedTags.includes(tag)) {
        const newTags = prevSelectedTags.filter(
          selectedTag => selectedTag !== tag
        );
        return newTags.length ? newTags : ['All'];
      }
      return prevSelectedTags.includes('All')
        ? [tag]
        : [...prevSelectedTags, tag];
    });
  };

  const resetSelectedTags = () => {
    setSelectedTags(['All']);
  };

  return (
    <TagContext.Provider
      value={{
        selectedTags,
        setSelectedTags: handleSetSelectedTag,
        resetSelectedTags,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export default TagProvider;
