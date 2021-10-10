import React, { useEffect, useState } from "react";
import { collection, query, addDoc, onSnapshot } from "firebase/firestore";
import { TextField, Container, Button } from "@mui/material";
import Cards from "../components/cards";
import { db } from "../database/firebase.config";
import { useHistory } from "react-router";
import Loading from "../components/loading";

function TopicSection(props) {
  const [topic, setTopic] = useState("");
  const [topicCardList, setTopicCardList] = useState([]);
  const history = useHistory();
  const { paramID } = props.match.params;
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setTopic("");
  };

  useEffect(() => {
    const q = query(collection(db, `subjects/${paramID}/topics`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      console.log("within topic snapshot");
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, name: doc.get("topicName") });
      });
      setTopicCardList(data);
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
            value={topic}
            autoComplete={"off"}
            onChange={(e) => setTopic(e.target.value)}
            margin={"dense"}
            name={"topic"}
            placeholder={"Add New Topic"}
            label={"Topic"}
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
        {topicCardList?.length ? (
          <Cards dataOf={"topics"} data={topicCardList} />
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

export default TopicSection;
