import { createSlice } from "@reduxjs/toolkit";

  

 const adminSlicer = createSlice({
    name : 'admin',
    initialState:{
        isAuth : false
    },
    reducers:{
        login : (state,action)=>{
            state.isAuth =true
        },
        logout :(state,action)=>{
            state.isAuth = false
        }

    }
 })

export const {login,logout} = adminSlicer.actions;
export default adminSlicer.reducer;

 

 

