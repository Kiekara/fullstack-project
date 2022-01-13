import React from "react";
import { Button } from "@mui/material";

function LearnButton({ learn, setSort, setLearn }) {
  const handleClick = () => {
    setSort(0);
    setLearn(true);
  };

  return !learn ? (
    <>
      <Button variant="contained" size="medium" onClick={handleClick}>
        Learn random words
      </Button>
    </>
  ) : (
    <>
      <Button disabled variant="contained" size="medium" onClick={handleClick}>
        Learn random words
      </Button>
    </>
  );
}

export default LearnButton;
