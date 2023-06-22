import { createContext } from 'react';

const TagContext = createContext({
  selectedTags: ['All'],
  setSelectedTags: () => {},
  resetSelectedTags: () => {}
});

export default TagContext;
