import React, { useState } from "react";
import Modals from "./modals";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemButton,
} from "@mui/material";

function NotesList({ subjectID, topicID, notesData }) {
  const [modalData, setModalData] = useState({
    status: false,
    idURL: "",
    field: "",
    type: "",
    toEdit: "",
  });

  const handleEditDelete = (id, name, type) => {
    setModalData({
      ...modalData,
      status: true,
      idURL: `subjects/${subjectID}/topics/${topicID}/notes/${id}`,
      field: name,
      toEdit: "notes",
      type: type,
    });
  };

  return (
    <>
      <Modals setModal={setModalData} dataState={modalData} />
      <List sx={{ width: "100%" }}>
        {notesData?.map((item, i) => (
          <ListItem key={i}>
            <ListItemText>{item?.name}</ListItemText>
            <ListItemButton sx={{ justifyContent: "flex-end" }}>
              <Button
                onClick={() => handleEditDelete(item?.id, item?.name, "edit")}
                color={"warning"}
                variant={"outlined"}>
                {"Edit"}
              </Button>
              <Button
                color={"error"}
                onClick={() => handleEditDelete(item?.id, item?.name, "delete")}
                sx={{ margin: "0px 20px" }}
                variant={"contained"}>
                {"Delete"}
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default NotesList;
