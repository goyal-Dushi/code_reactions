import React from "react";
import {
  Typography,
  Box,
  Modal,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../database/firebase.config";

function Modals({ dataState, setModal }) {
  const { idURL, status, toEdit, type, field } = dataState;
  const [modalState, setModalState] = useState({
    editField: "",
  });

  useEffect(() => {
    if (status) {
      setModalState({ ...modalState, editField: field });
    }
  }, [status, field]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (toEdit === "subject") {
      await setDoc(doc(db, `${idURL}`), {
        subjectName: modalState?.editField,
      });
    } else if (toEdit === "topic") {
      await setDoc(doc(db, `${idURL}`), {
        topicName: modalState?.editField,
      });
    } else {
      await setDoc(doc(db, `${idURL}`), {
        noteDesc: modalState?.editField,
      });
    }
    setModal({ ...dataState, status: false });
  };

  const handleDelete = async (e) => {
    await deleteDoc(doc(db, `${idURL}`));
    setModal({ ...dataState, status: false });
  };

  const handleClose = () => {
    setModal({ ...dataState, status: false });
  };

  return (
    <>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        onClose={() => setModal({ ...dataState, status: false })}
        open={status}>
        <Card sx={{ maxWidth: "300px" }}>
          <CardContent>
            {type === "edit" ? (
              <Box sx={{ width: "100%" }}>
                <form onSubmit={(e) => handleEditSubmit(e)}>
                  <TextField
                    fullWidth
                    value={modalState?.editField}
                    autoComplete={"off"}
                    onChange={(e) =>
                      setModalState({
                        ...modalState,
                        editField: e.target.value,
                      })
                    }
                    margin={"dense"}
                    name={"subject"}
                    placeholder={"Add New Subject"}
                    label={"Subject"}
                  />
                  <Button
                    variant={"contained"}
                    onClick={(e) => handleEditSubmit(e)}
                    color={"warning"}
                    type={"submit"}>
                    {"Edit"}
                  </Button>
                </form>
              </Box>
            ) : (
              <Box sx={{ width: "100%" }}>
                <Typography gutterBottom variant={"subtitle2"} color={"blue"}>
                  {"Are you sure you want to Delete!"}
                </Typography>
                <Button
                  onClick={(e) => handleDelete(e)}
                  variant={"outlined"}
                  color={"error"}>
                  {"Delete"}
                </Button>
              </Box>
            )}
            <Button
              onClick={() => handleClose()}
              variant={"contained"}
              color={"info"}>
              {"Cancel"}
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default Modals;
