import React from "react";
import WordRow from "../items/WordRow";
import { List } from "@mui/material";

function WordList({ words }) {
  return (
    <>
      <List
        sx={{
          bgcolor: "gray",
          pr: "16px",
          pl: "16px",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        {words.map((row) => (
          <WordRow row={row} />
        ))}
      </List>
    </>
  );
}

export default WordList;
