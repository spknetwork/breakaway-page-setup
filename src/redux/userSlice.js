import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { userPersistConfig } from './persistConfig';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    clearUser(state) {
      state.userData = null;
    },
  },
});

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export const { setUser, clearUser } = userSlice.actions;
export default persistedUserReducer;
