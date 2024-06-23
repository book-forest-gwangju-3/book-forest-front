import { combineReducers } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";

const rootReducer = combineReducers({
  page: pageReducer,
});

export default rootReducer;
