import React from "react";
import { Button } from "@mui/material";

function TagButton({ rights, tag, words, learn, setSort, setLearn }) {
  const { id, name } = tag;
  const numOfProps = words.filter((row) => row.tagID === id).length;

  const handleClick = () => {
    setSort(id);
    setLearn(true);
  };

  return (numOfProps >= 5 && rights === "user") || rights === "admin" ? (
    <>
      {!learn ? (
        <Button
          key={id}
          variant="contained"
          size="medium"
          onClick={handleClick}
        >
          Learn {name}
        </Button>
      ) : (
        <Button key={id} disabled variant="contained" size="medium">
          Learn {name}
        </Button>
      )}
    </>
  ) : null;
}

export default TagButton;
