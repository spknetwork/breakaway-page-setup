import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import userReducer from './userSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

const persistor = persistStore(store, null, () => {
  console.log('Redux state rehydrated');
});

export { store, persistor };
