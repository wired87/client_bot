import { combineReducers } from "@reduxjs/toolkit";
import conversationSlice from "../app/slices/authSlice";

const rootReducers = combineReducers({
  conversationSlice,
});

export default rootReducers;
