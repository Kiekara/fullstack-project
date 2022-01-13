import React from "react";
import { ListItem, ListItemText } from "@mui/material";

function WordRow({ row }) {
  return (
    <>
      <ListItem>
        <ListItemText primary={row.wordEng} />
      </ListItem>
    </>
  );
}

export default WordRow;
