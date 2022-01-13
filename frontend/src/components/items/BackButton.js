import React from "react";
import { Button } from "@mui/material";

function BackButton({ setSort }) {
  const handleClick = () => {
    setSort(-1);
  };

  return (
    <>
      <Button disabled variant="contained" size="medium" onClick={handleClick}>
        Go back
      </Button>
    </>
  );
}

export default BackButton;
