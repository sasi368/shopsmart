// redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';
import {RootReducerType} from './reducers';
import {PersistConfig} from 'redux-persist';

const persistConfig: PersistConfig<RootReducerType> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'wishlist'],
};

const persistedReducer = persistReducer<RootReducerType>(
  persistConfig,
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
