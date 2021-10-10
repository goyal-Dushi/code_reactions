import React, { useEffect, useState } from "react";
import { collection, query, addDoc, onSnapshot } from "firebase/firestore";
import { TextField, Container, Button } from "@mui/material";
import NotesList from "../components/noteLists";
import { db } from "../database/firebase.config";
import { useHistory } from "react-router";
import Loading from "../components/loading";

function NotesSection(props) {
  const [note, setNote] = useState("");
  const [noteList, setNoteList] = useState([]);
  const history = useHistory();
  const { subjectID, topicID } = props.match.params;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(
        collection(db, `subjects/${subjectID}/topics/${topicID}/notes`),
        {
          noteDesc: note,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
      setNoteList(data);
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
        {noteList?.length ? (
          <NotesList
            subjectID={subjectID}
            topicID={topicID}
            notesData={noteList}
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
