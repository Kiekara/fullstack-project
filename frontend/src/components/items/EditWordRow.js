import React, { useState } from "react";
import { IconButton, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function EditWordRow({
  row,
  swap,
  primary,
  secondary,
  setRowEdit,
  getData,
  api,
}) {
  const { tagID } = row;
  const [newPri, setNewPri] = useState("");
  const [newSec, setNewSec] = useState("");

  const handlePrimary = (event) => {
    let inputValue = event.target.value;
    setNewPri(inputValue);
  };

  const handleSecondary = (event) => {
    let inputValue = event.target.value;
    setNewSec(inputValue);
  };

  return (
    <ListItem>
      <TextField
        hiddenLabel
        placeholder={primary}
        variant="filled"
        value={newPri}
        size="small"
        margin="dense"
        sx={{ width: "41%", mr: "8px" }}
        onChange={handlePrimary}
      />
      <TextField
        hiddenLabel
        placeholder={secondary}
        variant="filled"
        value={newSec}
        size="small"
        margin="dense"
        sx={{ width: "41%", mr: "8px" }}
        onChange={handleSecondary}
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
