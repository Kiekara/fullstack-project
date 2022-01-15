// Import modules
import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for exiting category editing mode
 * @param {Object} props Component props
 * @param {()} props.setEdit Used for changing edit state
 * @returns
 */
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
