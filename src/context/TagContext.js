import { createContext } from 'react';

const TagContext = createContext({
  selectedTags: [],
  setSelectedTags: () => {},
  resetSelectedTags: () => {}
});

export default TagContext;
