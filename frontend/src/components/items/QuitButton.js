import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function QuitButton({ setEdit }) {
  return (
    <span style={{ marginRight: "auto", marginLeft: "auto" }}>
      <Button
        variant="contained"
        size="medium"
        startIcon={<FontAwesomeIcon icon={faTimes} />}
      >
        Quit editing
      </Button>
    </span>
  );
}

export default QuitButton;
