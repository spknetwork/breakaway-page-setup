import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

export { userPersistConfig, authPersistConfig };
