import React, { useState } from "react";
import { Button, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function EditTagForm({ tag, getData, api }) {
  const [newTag, setNewTag] = useState("");
  const { id, name } = tag;

  const handleChange = (event) => {
    let inputValue = event.target.value;
    setNewTag(inputValue);
  };

  return (
    <ListItem>
      <TextField
        hiddenLabel
        placeholder={name}
        value={name}
        size="small"
        sx={{ width: "62%", height: "36.5px", mr: "auto" }}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        size="medium"
        color="success"
        startIcon={<FontAwesomeIcon icon={faCheck} />}
      >
        Save changes
      </Button>
    </ListItem>
  );
}

export default EditTagForm;
