import React, { useState, useEffect } from "react";
import { IconButton, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function WordRowForm({ sort, swap, getData, api }) {
  const [priLabel, setPriLabel] = useState("");
  const [secLabel, setSecLabel] = useState("");
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");

  useEffect(() => {
    if (!swap) {
      setPriLabel("English");
      setSecLabel("Finnish");
    } else {
      setPriLabel("Finnish");
      setSecLabel("English");
    }
  }, [swap]);

  return (
    <ListItem>
      <TextField
        label={priLabel}
        variant="filled"
        size="small"
        margin="dense"
        sx={{ width: "45%", mr: "8px" }}
      />
      <TextField
        label={secLabel}
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
