import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TagsState = string[];
const tagsSlice = createSlice({
  name: 'tags',
  initialState: ['All'] as TagsState,
  reducers: {
    selectTag: (state, action: PayloadAction<string>) => {
      if (action.payload === 'All') {
        return ['All'];
      }
      if (state.includes(action.payload)) {
        const newTags = state.filter(tag => tag !== action.payload);
        return newTags.length ? newTags : ['All'];
      }
      return state.includes('All')
        ? [action.payload]
        : [...state, action.payload];
    },
    resetTags: () => ['All'],
  },
});

export const { selectTag, resetTags } = tagsSlice.actions;

export default tagsSlice.reducer;
