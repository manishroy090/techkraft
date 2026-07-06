import { createSlice } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";

export const AuthUserSlice = createSlice({
    name:'authuser',
    initialState:{authUser:null},
    reducers :{
        setAuthUser: (state ,action) =>{
            state.authUser =action.payload
        }
    }
})


export const {setAuthUser} = AuthUserSlice.actions

export default AuthUserSlice.reducer;