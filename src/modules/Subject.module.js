import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { TextField, Container, Button } from "@mui/material";
import Cards from "../components/cards";
import { db } from "../database/firebase.config";
import { setSubjects, addSubject } from "../redux/subjectSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";

function SubjectSection() {
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();
  const { values } = useSelector((state) => state?.rootReducer.subjects);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject) {
      return;
    }
    console.log("Subject : ", subject);
    dispatch(addSubject({ subject }));
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
      dispatch(setSubjects({ data }));
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
        {values?.length ? (
          <Cards dataOf={"subjects"} data={values} />
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}

export default SubjectSection;
