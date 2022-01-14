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

  const handlePost = async () => {
    let response = await api.postData("tags", { name: tag });
    console.log(response);
    let result = await getData("tags");
    console.log(result);
    setTag("");
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
        <IconButton size="medium" color="success" onClick={handlePost}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </span>
    </>
  );
}

export default AddTagForm;
