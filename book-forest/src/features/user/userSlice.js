import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLogin: false,
  userInfo: null,
  isDbInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isLogin = true;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.token = "";
      state.isLogin = false;
      state.userInfo = null;
    },
    setIsDbInitialized: (state) => {
      state.isDbInitialized = !state.isDbInitialized;
    },
  },
});

export const { setUser, setUserInfo, clearUser, setIsDbInitialized } =
  userSlice.actions;
export default userSlice.reducer;
