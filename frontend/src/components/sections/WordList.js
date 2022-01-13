import React, { useState } from "react";
import StartView from "./StartView";
import WordRow from "../items/WordRow";
import { Button, List, ListItem } from "@mui/material";

function WordList({ words, sort, learn, setSort, setLearn }) {
  const [answers, setAnswers] = useState([]);

  return sort === -1 ? (
    <StartView learn={learn} setSort={setSort} setLearn={setLearn} />
  ) : (
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
        {words.map((row) =>
          sort === 0 ? (
            <WordRow row={row} />
          ) : row.tagID === sort ? (
            <WordRow row={row} />
          ) : null
        )}
        <ListItem>
          <Button fullWidth variant="contained" size="medium" margin="dense">
            Check answers
          </Button>
        </ListItem>
      </List>
    </>
  );
}

export default WordList;
