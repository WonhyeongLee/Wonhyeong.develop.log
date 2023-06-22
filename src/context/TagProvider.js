import React, { useState } from 'react';

import TagContext from './TagContext';

const TagProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState(['All']);

  const handleSetSelectedTag = tag => {
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
        resetSelectedTags
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export default TagProvider;
