import React, { useState } from "react";
import { ListItem, ListItemText, TextField } from "@mui/material";

function WordRow({ row }) {
  const { wordEng, wordFin } = row;
  const [input, setInput] = useState("");

  return (
    <>
      <ListItem>
        <ListItemText primary={wordEng} />
        <TextField
          hiddenLabel
          value={input}
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
