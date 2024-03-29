// Import modules
import React, { useState } from "react";
import { IconButton, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for editing word pairs
 * @param {Object} props Component props
 * @param {row} props.row Stores words and tag id
 * @param {swap} props.swap Indicates if user has swapped language order
 * @param {string} props.primary Indicates primary language
 * @param {string} props.secondary Indicates secondary language
 * @param {()} props.setRowEdit Used change setRow state
 * @param {()} props.getData Used for fetching data from database
 * @param {{}} props.api Stores other database connection functions
 * @returns
 */
function EditWordRow({
  row,
  swap,
  primary,
  secondary,
  setRowEdit,
  getData,
  api,
}) {
  const { id, tagID } = row;
  const [newPri, setNewPri] = useState(primary);
  const [newSec, setNewSec] = useState(secondary);

  const data = {
    tagID: tagID,
    wordEng: !swap ? newPri : newSec,
    wordFin: !swap ? newSec : newPri,
  };

  const handlePrimary = (event) => {
    let inputValue = event.target.value;
    setNewPri(inputValue);
  };

  const handleSecondary = (event) => {
    let inputValue = event.target.value;
    setNewSec(inputValue);
  };

  const handleCancel = () => {
    setNewPri("");
    setNewSec("");
    setRowEdit(false);
  };

  // Put words
  const handleConfirm = async () => {
    let response = await api.editData("words", data, id);
    console.log(response);
    let result = await getData("words");
    console.log(result);
    setNewPri("");
    setNewSec("");
    setRowEdit(false);
  };

  return (
    <ListItem key={id}>
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
        <IconButton size="medium" color="error" onClick={handleCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
        <IconButton size="medium" color="success" onClick={handleConfirm}>
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
      </span>
    </ListItem>
  );
}

export default EditWordRow;
