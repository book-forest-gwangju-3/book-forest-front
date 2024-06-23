import { combineReducers } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
});

export default rootReducer;
