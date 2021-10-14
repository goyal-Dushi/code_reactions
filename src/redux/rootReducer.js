import { combineReducers } from "redux";
import subjectReducer from "./subjectSlice";

export const rootReducer = combineReducers({
  subjects: subjectReducer,
});
