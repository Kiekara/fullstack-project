import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function EditButton() {
  return (
    <span style={{ marginRight: "auto", marginLeft: "auto" }}>
      <Button
        variant="contained"
        size="medium"
        startIcon={<FontAwesomeIcon icon={faEdit} />}
      >
        Edit category
      </Button>
    </span>
  );
}

export default EditButton;
