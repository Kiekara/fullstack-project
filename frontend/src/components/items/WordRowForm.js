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

  const handlePrimary = (event) => {
    let inputValue = event.target.value;
    setPrimary(inputValue);
  };

  const handleSecondary = (event) => {
    let inputValue = event.target.value;
    setSecondary(inputValue);
  };

  return (
    <ListItem>
      <TextField
        label={priLabel}
        variant="filled"
        value={primary}
        size="small"
        margin="dense"
        sx={{ width: "45%", mr: "8px" }}
        onChange={handlePrimary}
      />
      <TextField
        label={secLabel}
        variant="filled"
        value={secondary}
        size="small"
        margin="dense"
        sx={{ width: "45%", mr: "8px" }}
        onChange={handleSecondary}
      />
      <IconButton size="medium" color="success">
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    </ListItem>
  );
}

export default WordRowForm;
