import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function QuitButton({ setEdit }) {
  const handleQuit = () => {
    setEdit(false);
  };

  return (
    <span style={{ marginRight: "auto", marginLeft: "auto" }}>
      <Button
        variant="contained"
        size="medium"
        color="error"
        startIcon={<FontAwesomeIcon icon={faTimes} />}
        onClick={handleQuit}
      >
        Quit editing
      </Button>
    </span>
  );
}

export default QuitButton;
