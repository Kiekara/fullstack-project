import React, { useState } from "react";
import { IconButton, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function WordRowForm({ swap, getData, api }) {
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");

  return (
    <ListItem>
      <TextField
        label={primary}
        variant="filled"
        size="small"
        margin="dense"
        sx={{ width: "45%", mr: "8px" }}
      />
      <TextField
        label={secondary}
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
