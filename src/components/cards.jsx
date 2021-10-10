import React, { useState } from "react";
import Modals from "./modals";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Box,
  Button,
} from "@mui/material";
import { useHistory, withRouter } from "react-router";

function Cards(props) {
  const paramID = props?.match?.params?.paramID;
  const history = useHistory();
  const [modalData, setModalData] = useState({
    status: false,
    idURL: "",
    field: "",
    type: "",
    toEdit: "",
  });

  const handleEditDelete = (id, name, type) => {
    if (props?.dataOf === "subjects") {
      setModalData({
        ...modalData,
        status: true,
        idURL: `subjects/${id}`,
        field: name,
        toEdit: "subject",
        type: type,
      });
    } else if (props.dataOf === "topics") {
      setModalData({
        ...modalData,
        status: true,
        idURL: `subjects/${paramID}/topics/${id}`,
        field: name,
        toEdit: "topic",
        type: type,
      });
    }
  };

  const handleRouteClick = (id) => {
    if (props?.dataOf === "subjects") {
      history.push(`/subject/${id}`);
    } else if (props?.dataOf === "topics") {
      history.push(`/topics/${paramID}/${id}`);
    }
  };

  return (
    <>
      <Modals setModal={setModalData} dataState={modalData} />
      {props?.data?.map((item, i) => (
        <Card key={i} sx={{ maxWidth: "300px", margin: "20px 10px" }} raised>
          <CardActionArea onClick={() => handleRouteClick(item?.id)}>
            <CardContent>
              <Typography gutterBottom>{item?.name}</Typography>
              <List>
                <ListItem>
                  <ListItemText> {item?.id} </ListItemText>
                </ListItem>
              </List>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box
              sx={{
                widht: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}>
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
            </Box>
          </CardActions>
        </Card>
      ))}
    </>
  );
}

export default withRouter(Cards);
