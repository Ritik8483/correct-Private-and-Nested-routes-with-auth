import { createSlice } from '@reduxjs/toolkit';

export interface AuthData{
    "name":string,
    "token":string
}

const initialState:AuthData={
    name:"",
    token:""
}

export const AuthSlice=createSlice({
    name:'AuthSlice',
    initialState,
    reducers:{
        localStoreCredentials:(state,action)=>{
            localStorage.setItem("user",JSON.stringify({name:action.payload.name,token:action.payload.token}));
            state.name=action.payload.name;
            state.token=action.payload.token;
        },
        logout:(state)=>{
            localStorage.removeItem("user");
            state.name="";
            state.token="";
        }
    }
});

export const { localStoreCredentials,logout } = AuthSlice.actions;
export default AuthSlice.reducer;



