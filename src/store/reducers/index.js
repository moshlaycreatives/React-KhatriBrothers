import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducers";
import courseReducer from "./courseReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
});

export default rootReducer;
