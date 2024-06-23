import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pages: [true, false],
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pages = state.pages.map(
        (_, idx) => (idx === action.payload ? true : false)
      );
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;