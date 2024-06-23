import { combineReducers } from "@reduxjs/toolkit";
import pageReducer from "./../features/page/pageSlice";
import userReducer from "./../features/user/userSlice";

const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
});

export default rootReducer;
