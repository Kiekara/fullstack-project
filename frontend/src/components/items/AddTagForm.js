import React from "react";
import { IconButton, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddTagForm() {
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
          value={""}
          size="small"
          margin="dense"
          sx={{ width: "85%", mr: "8px" }}
        />
        <IconButton size="medium" color="success">
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </span>
    </>
  );
}

export default AddTagForm;
