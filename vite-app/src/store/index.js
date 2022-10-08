import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { organizationApi } from '../services/organization';
import { userApi } from '../services/user';

const rootReducer = combineReducers({
  [organizationApi.reducerPath]: organizationApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      organizationApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ),
});
