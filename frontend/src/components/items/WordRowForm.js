import React from "react";
import { IconButton, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function WordRowForm() {
  return (
    <ListItem>
      <TextField
        hiddenLabel
        variant="filled"
        size="small"
        margin="dense"
        sx={{ width: "45%", mr: "8px" }}
      />
      <TextField
        hiddenLabel
        variant="filled"
        size="small"
        margin="dense"
        sx={{ width: "45%", mr: "8px" }}
      />
      <IconButton size="medium" color="success">
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    </ListItem>
  );
}

export default WordRowForm;
