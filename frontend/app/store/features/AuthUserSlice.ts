import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "@services/Auth";
import { ILogin } from "@/interface/ILogin";
import { Axios } from "@libs/axios";

export const AuthUserSlice = createSlice({
  name: "authuser",
  initialState: {
    authUser: {},
    loading: false,
    error: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    logout: () => {
         //this action is directly trigger by rootreducer to clear sorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.authUser = action.payload;
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const fetchAuthUser = createAsyncThunk(
  "auth/login",
  async (Logindata:ILogin,thunkAPI) => {
    try {
      const { data } = await Axios.post("/auth/login", Logindata);
      return data[0];
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }

  }
);

export const logoutauth = createAsyncThunk("auth/logout",async()=>{

   try {
     return await Axios.post("auth/logout")
    
   } catch (error) {
      console.log("error",error)
   }

})

export const { setAuthUser ,logout} = AuthUserSlice.actions;

export default AuthUserSlice.reducer;
