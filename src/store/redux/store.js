import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';

// Redux Persist
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Storage option for Redux Persist
import EncryptedStorage from 'react-native-encrypted-storage';

// Use AsyncStorage instead of EncryptedStorage in case of any issues that might occur:-
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Slices
import themeSlice from './themeSlice';
import userSlice from './userSlice';

const reducers = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
