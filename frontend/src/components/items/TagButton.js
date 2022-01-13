import React from "react";
import { Button } from "@mui/material";

function TagButton({ tag }) {
  const { id, name } = tag;

  return (
    <>
      <Button variant="contained" size="medium">
        Learn {name}
      </Button>
    </>
  );
}

export default TagButton;
