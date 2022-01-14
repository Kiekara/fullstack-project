import React from "react";
import { IconButton, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function EditWordRow({ row, swap, setRowEdit, getData, api }) {
  return (
    <ListItem>
      <TextField
        hiddenLabel
        variant="filled"
        size="small"
        margin="dense"
        sx={{ width: "41%", mr: "8px" }}
      />
      <TextField
        hiddenLabel
        variant="filled"
        size="small"
        margin="dense"
        sx={{ width: "41%", mr: "8px" }}
      />
      <span style={{ paddingLeft: "8px" }}>
        <IconButton size="medium" color="error">
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
        <IconButton size="medium" color="success">
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
      </span>
    </ListItem>
  );
}

export default EditWordRow;
