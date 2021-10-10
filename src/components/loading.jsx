import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
