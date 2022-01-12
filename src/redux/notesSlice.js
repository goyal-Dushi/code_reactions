import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../database/firebase.config";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    values: [],
  },
  reducers: {
    setnotes: (state, action) => {
      console.log("action payload: ", action.payload);
      state.values = [...action.payload.data];
    },
  },
});

export const { setnotes } = noteSlice.actions;
export default noteSlice.reducer;

export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ note, subjectID, topicID }) => {
    try {
      await addDoc(
        collection(db, `subjects/${subjectID}/topics/${topicID}/notes`),
        {
          noteDesc: note,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ newValue, idURL }) => {
    await setDoc(doc(db, `${idURL}`), {
      noteDesc: newValue,
    });
  }
);
