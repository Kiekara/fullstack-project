// Import modules
import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for adding tags
 * @param {Object} props Component props
 * @param {string} props.rights User rights
 * @param {Array} props.tags Tags
 * @param {()} props.getData Used for fetching data from database
 * @param {{}} props.api Stores other database connection functions
 * @returns
 */
function AddTagForm({ rights, tags, getData, api }) {
  const [tag, setTag] = useState("");

  const handleChange = (event) => {
    let inputValue = event.target.value;
    setTag(inputValue);
  };

  const checkDuplicates = (tag, tags) => {
    let names = tags.map((tag) => tag.name);

    return names.includes(tag);
  };

  const handlePost = async () => {
    let found = checkDuplicates(tag.toLowerCase(), tags);
    console.log(found);

    // No duplicate posts to database
    if (!found) {
      let response = await api.postData("tags", { name: tag });
      console.log(response);
      let result = await getData("tags");
      console.log(result);
    }

    setTag("");
  };

  return rights === "admin" ? (
    <>
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Category"
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
  ) : null;
}

export default AddTagForm;
