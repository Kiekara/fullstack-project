import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteButton() {
  return (
    <>
      <Button
        variant="contained"
        color="error"
        size="medium"
        startIcon={<FontAwesomeIcon icon={faTrash} />}
      >
        Delete category
      </Button>
    </>
  );
}

export default DeleteButton;
