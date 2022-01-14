import React from "react";
import { Button, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function EditTagForm({ tag, getData, api }) {
  const { id, name } = tag;

  return (
    <ListItem>
      <TextField
        hiddenLabel
        placeholder={name}
        size="small"
        sx={{ width: "62%", height: "36.5px", mr: "auto" }}
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
