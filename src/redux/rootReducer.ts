import { combineReducers } from '@reduxjs/toolkit';

import tagsReducer from '@redux/features/tags/tagsSlice';

const rootReducer = combineReducers({
  tags: tagsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
