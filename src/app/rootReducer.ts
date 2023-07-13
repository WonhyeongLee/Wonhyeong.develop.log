import { combineReducers } from '@reduxjs/toolkit';

import tagsReducer from '../features/tags/tagsSlice';

const rootReducer = combineReducers({
  tags: tagsReducer
  // 다른 리듀서 추가
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
