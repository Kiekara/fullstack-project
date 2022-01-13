import React from "react";
import { Button } from "@mui/material";

function TagButton({ tag, setSort }) {
  const { id, name } = tag;

  const handleClick = () => {
    setSort(id);
  };

  return (
    <>
      <Button variant="contained" size="medium" onClick={handleClick}>
        Learn {name}
      </Button>
    </>
  );
}

export default TagButton;
