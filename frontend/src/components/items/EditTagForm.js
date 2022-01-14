import React, { useState } from "react";
import { Button, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function EditTagForm({ tag, setEdit, getData, api }) {
  const [newTag, setNewTag] = useState(tag.name);
  const { id, name } = tag;

  const handleChange = (event) => {
    let inputValue = event.target.value;
    setNewTag(inputValue);
  };

  const handleEdit = async () => {
    let response = await api.editData("tags", { name: newTag }, id);
    console.log(response);
    let result = await getData("tags");
    console.log(result);
    setEdit(false);
  };

  return (
    <ListItem>
      <TextField
        hiddenLabel
        placeholder={name}
        value={newTag}
        size="small"
        sx={{ width: "62%", height: "36.5px", mr: "auto" }}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        size="medium"
        color="success"
        startIcon={<FontAwesomeIcon icon={faCheck} />}
        onClick={handleEdit}
      >
        Save changes
      </Button>
    </ListItem>
  );
}

export default EditTagForm;
