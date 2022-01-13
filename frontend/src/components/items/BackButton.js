import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function BackButton({ learn, setSort, setLearn, setSubmit }) {
  const handleClick = () => {
    setSort(-1);
    setLearn(false);
    setSubmit(false);
  };

  return !learn ? (
    <>
      <Button
        disabled
        variant="contained"
        size="medium"
        startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        onClick={handleClick}
      >
        Go back
      </Button>
    </>
  ) : (
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
