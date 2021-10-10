import React from "react";
import ReactDOM from "react-dom";
import { Container } from "@mui/material";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      fluid={"true"}>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
