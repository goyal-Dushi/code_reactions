import React, { useEffect, useState } from "react";
import { collection, query, addDoc, onSnapshot } from "firebase/firestore";
import { TextField, Container, Button } from "@mui/material";
import Cards from "../components/cards";
import { db } from "../database/firebase.config";
import Loading from "../components/loading";

function SubjectSection() {
  const [subject, setSubject] = useState("");
  const [subjectCardList, setSubjectCardList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject) {
      return;
    }
    console.log("Subject : ", subject);
    try {
      const docRef = await addDoc(collection(db, "subjects"), {
        subjectName: subject,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setSubject("");
  };

  useEffect(() => {
    const q = query(collection(db, "subjects"));
    let data = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("within subject snapshot");
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, name: doc.get("subjectName") });
      });
      setSubjectCardList(data);
      data = [];
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <Container disableGutters>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            fullWidth
            value={subject}
            autoComplete={"off"}
            onChange={(e) => setSubject(e.target.value)}
            margin={"dense"}
            name={"subject"}
            placeholder={"Add New Subject"}
            label={"Subject"}
          />
          <Button variant={"contained"} color={"success"} type={"submit"}>
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
        {subjectCardList?.length ? (
          <Cards dataOf={"subjects"} data={subjectCardList} />
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}

export default SubjectSection;
