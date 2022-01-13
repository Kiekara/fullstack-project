import React from "react";
import { Button } from "@mui/material";

function TagButton({ tag, learn, setSort, setLearn }) {
  const { id, name } = tag;

  const handleClick = () => {
    setSort(id);
    setLearn(true);
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
