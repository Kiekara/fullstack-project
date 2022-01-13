import React from "react";
import { ListItem, ListItemText, TextField } from "@mui/material";

function WordRow({ row }) {
  const { wordEng, wordFin } = row;

  return (
    <>
      <ListItem>
        <ListItemText primary={wordEng} />
        <TextField
          hiddenLabel
          variant="filled"
          size="small"
          margin="dense"
          sx={{ width: "50%" }}
        />
      </ListItem>
    </>
  );
}

export default WordRow;
