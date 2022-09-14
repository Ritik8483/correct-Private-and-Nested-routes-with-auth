import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const AuthApi=createApi({
    reducerPath:'AuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://testtourapp.herokuapp.com/' }),
    endpoints:(builder)=>({
        loginUsers:builder.mutation
        ({
            query:(creds)=>({
                url:'/users/signin',
                method:'POST',
                body:creds,
            })
        }),
        registerUser:builder.mutation<any,any>({
            query:(creds)=>({
                url:'/users/signup',
                method:'POST',
                body:creds,
            })
        }),
    })
});

export const {useLoginUsersMutation,useRegisterUserMutation}=AuthApi;