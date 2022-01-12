import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../database/firebase.config";

const subjectSlice = createSlice({
  name: "subjects",
  initialState: {
    values: [],
  },
  reducers: {
    setSubjects: (state, action) => {
      console.log("action payload: ", action.payload);
      state.values = [...action.payload.data];
    },
  },
});

export const { setSubjects } = subjectSlice.actions;
export default subjectSlice.reducer;

export const addSubject = createAsyncThunk(
  "subjects/addSubject",
  async ({ subject }) => {
    try {
      await addDoc(collection(db, "subjects"), {
        subjectName: subject,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
);

export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async ({ newValue, idURL }) => {
    await setDoc(doc(db, `${idURL}`), {
      subjectName: newValue,
    });
  }
);
