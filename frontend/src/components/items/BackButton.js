import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function BackButton({ setSort, setLearn, setEdit, setSubmit }) {
  const handleClick = () => {
    setSort(-1);
    setLearn(false);
    setEdit(false);
    setSubmit(false);
  };

  return (
    <>
      <Button
        variant="contained"
        size="medium"
        startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        onClick={handleClick}
      >
        Go back
      </Button>
    </>
  );
}

export default BackButton;
