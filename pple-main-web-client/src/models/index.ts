import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// session Storage 에 저장
import storage from 'redux-persist/lib/storage';

import account from './auth/account';
import comment from './comment';
import search from './search';

const persistConfig = {
  key: 'root',
  storage,
  whileList: ['account'],
};

const rootReducer = combineReducers({
  account,
  comment,
  search,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
