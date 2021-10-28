import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { TextField, Container, Button } from "@mui/material";
import NotesList from "../components/noteLists";
import { db } from "../database/firebase.config";
import { useHistory } from "react-router";
import Loading from "../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { addNote, setnotes } from "../redux/notesSlice";

function NotesSection(props) {
  const [note, setNote] = useState("");
  const { values } = useSelector((state) => state.rootReducer.notes);
  const dispatch = useDispatch();
  const history = useHistory();
  const { subjectID, topicID } = props.match.params;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note) {
      return;
    }
    dispatch(addNote({ subjectID, topicID, note }));
    setNote("");
  };

  useEffect(() => {
    const q = query(
      collection(db, `subjects/${subjectID}/topics/${topicID}/notes`)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      console.log("within notes snapshot");
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, name: doc.get("noteDesc") });
      });
      dispatch(setnotes({ data }));
      data = [];
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <>
      <Container disableGutters>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            fullWidth
            value={note}
            autoComplete={"off"}
            onChange={(e) => setNote(e.target.value)}
            margin={"dense"}
            name={"note"}
            placeholder={"Add New Note"}
            label={"Notes"}
          />
          <Button color={"success"} variant={"contained"} type={"submit"}>
            {"Add"}
          </Button>
        </form>
      </Container>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
        disableGutters>
        {values?.length ? (
          <NotesList
            subjectID={subjectID}
            topicID={topicID}
            notesData={values}
          />
        ) : (
          <Loading />
        )}
      </Container>
      <Button variant={"contained"} onClick={() => handleBackClick()}>
        {"Go Back"}
      </Button>
    </>
  );
}

export default NotesSection;
