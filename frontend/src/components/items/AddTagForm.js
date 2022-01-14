import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddTagForm({ getData, api }) {
  const [tag, setTag] = useState("");

  const handleChange = (event) => {
    let inputValue = event.target.value;
    setTag(inputValue);
  };

  return (
    <>
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Tag"
          value={tag}
          size="small"
          margin="dense"
          sx={{ width: "85%", mr: "8px" }}
          onChange={handleChange}
        />
        <IconButton size="medium" color="success">
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </span>
    </>
  );
}

export default AddTagForm;
