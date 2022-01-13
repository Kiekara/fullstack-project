import React from "react";
import { Button } from "@mui/material";

function LearnButton({ setSort }) {
  const handleClick = () => {
    setSort(0);
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
