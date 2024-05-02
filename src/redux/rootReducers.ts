import { combineReducers } from "@reduxjs/toolkit";
import conversationSlice from "./slice";

const rootReducers = combineReducers({
  conversationSlice,
});

export default rootReducers;
