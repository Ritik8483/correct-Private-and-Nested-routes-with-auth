import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token=useSelector((state:any)=>state?.AuthSlice?.token);
    const localStoreToken=localStorage.getItem("user");
    const parseData=JSON.parse(localStoreToken || "{}");
    console.log('TTTT ::: ',token);
    // console.log('LLLL ::: ',parseData?.token);
    
  return token || parseData?.token ? <Outlet/> : <Navigate to='/' />
}

export default PrivateRoute