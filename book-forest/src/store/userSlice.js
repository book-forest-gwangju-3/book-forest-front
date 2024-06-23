import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isLogin: false,
  nickname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, isLogin, nickname } = action.payload;
      state.isLogin = isLogin;
      state.nickname = nickname;
    },
    clearUser: (state) => {
      state.token = '';
      state.isLogin = false;
      state.nickname = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;