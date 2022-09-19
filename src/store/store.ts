import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../rtkQueries/AuthApi'
import { UserApi } from '../rtkQueries/UserApi';
import AuthSlice from '../slices/AuthSlice';

export const store=configureStore({
    reducer:{
        AuthSlice:AuthSlice,
        [AuthApi.reducerPath]:AuthApi.reducer,
        [UserApi.reducerPath]:UserApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware).concat(UserApi.middleware),
});

export default store;