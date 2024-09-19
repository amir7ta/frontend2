import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/userActions";

const initialState = {
  currentUser: null,
  token: localStorage.getItem("token") || "",
  isLoading: false,
  error: null,
  decodedToken :localStorage.getItem("decodedToken") || ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("decodedToken");
      state.currentUser = null;
      state.token = "";
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;

      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.token;
        state.decodedToken = action.payload.decodedToken;
        state.currentUser = action.payload.user;
        localStorage.setItem('token',action.payload.token);
        localStorage.setItem('decodedToken',action.payload.decodedToken)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        //state.token = "";
       // state.currentUser = null;
        //console.log("rejected")
      });
  },
});

export const selectToken = (state) => state.user.token;
export const selectDecodedToken = (state) => state.user.decodedToken;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export const { setUser, setLoading, setError, logout } = userSlice.actions;


export default userSlice.reducer;
