import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../database/firebase.config";

const topicSlice = createSlice({
  name: "topics",
  initialState: {
    values: [],
  },
  reducers: {
    settopics: (state, action) => {
      console.log("action payload: ", action.payload);
      state.values = [...action.payload.data];
    },
  },
});

export const { settopics } = topicSlice.actions;
export default topicSlice.reducer;

export const addTopic = createAsyncThunk(
  "topics/addTopic",
  async ({ topic, paramID }) => {
    try {
      const docRef = await addDoc(
        collection(db, `subjects/${paramID}/topics`),
        {
          topicName: topic,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
);

export const updateTopic = createAsyncThunk(
  "topics/updateTopic",
  async ({ newValue, idURL }) => {
    await setDoc(doc(db, `${idURL}`), {
      topicName: newValue,
    });
  }
);
