import React from "react";
import { Button } from "@mui/material";

function BackButton({ learn, setSort, setLearn, setSubmit }) {
  const handleClick = () => {
    setSort(-1);
    setLearn(false);
    setSubmit(false);
  };

  return !learn ? (
    <>
      <Button disabled variant="contained" size="medium" onClick={handleClick}>
        Go back
      </Button>
    </>
  ) : (
    <>
      <Button variant="contained" size="medium" onClick={handleClick}>
        Go back
      </Button>
    </>
  );
}

export default BackButton;
