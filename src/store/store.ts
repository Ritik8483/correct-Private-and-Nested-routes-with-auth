import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../rtkQueries/AuthApi'
import AuthSlice from '../slices/AuthSlice';

export const store=configureStore({
    reducer:{
        AuthSlice:AuthSlice,
        [AuthApi.reducerPath]:AuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});

export default store;