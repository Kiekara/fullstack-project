// Import modules
import React, { useState, useEffect } from "react";
import { IconButton, ListItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for adding word pairs
 * @param {Object} props Component props
 * @param {number} props.sort Used for sorting by tag
 * @param {boolean} props.swap Indicates if user has swapped language order
 * @param {()} props.getData Used for fetching data from database
 * @param {{}} props.api Stores other database connection functions
 * @returns
 */
function AddWordRow({ sort, swap, getData, api }) {
  const [priLabel, setPriLabel] = useState("");
  const [secLabel, setSecLabel] = useState("");
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");

  const data = {
    tagID: sort,
    wordEng: !swap ? primary : secondary,
    wordFin: !swap ? secondary : primary,
  };

  // Check which language is in primary position
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

  // Post words
  const handlePost = async () => {
    let response = await api.postData("words", data);
    console.log(response);
    let result = await getData("words");
    console.log(result);
    setPrimary("");
    setSecondary("");
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
      <IconButton size="medium" color="success" onClick={handlePost}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    </ListItem>
  );
}

export default AddWordRow;
