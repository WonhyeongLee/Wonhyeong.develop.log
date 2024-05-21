import { createContext } from 'react';

type TagContextType = {
  selectedTags: string[];
  // eslint-disable-next-line no-unused-vars
  setSelectedTags: (tag: string) => void;
  resetSelectedTags: () => void;
};

const initialContext: TagContextType = {
  selectedTags: ['All'],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedTags: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetSelectedTags: () => {},
};

const TagContext = createContext<TagContextType>(initialContext);

export default TagContext;
