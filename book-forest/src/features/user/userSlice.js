import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || '',
  isLogin: localStorage.getItem('isLogin') === 'true' ? true : false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token } = action.payload;
      state.token = token
      state.isLogin = true
      localStorage.setItem('token', token);
      localStorage.setItem('isLogin', 'true');
    },
    clearUser: (state) => {
      state.token = '';
      state.isLogin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('isLogin');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;