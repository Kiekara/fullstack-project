import React from "react";
import { Button } from "@mui/material";

function LearnButton({ setSort, setLearn }) {
  const handleClick = () => {
    setSort(0);
    setLearn(true);
  };

  return (
    <>
      <Button variant="contained" size="medium" onClick={handleClick}>
        Learn random words
      </Button>
    </>
  );
}

export default LearnButton;
