import { combineReducers } from "redux";
import subjectReducer from "./subjectSlice";
import topicReducer from "./topicsSlice";
import noteReducer from "./notesSlice";

export const rootReducer = combineReducers({
  subjects: subjectReducer,
  topics: topicReducer,
  notes: noteReducer,
});
