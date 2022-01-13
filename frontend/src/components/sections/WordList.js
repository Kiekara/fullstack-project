import React, { useState, useEffect } from "react";
import StartView from "./StartView";
import WordRow from "../items/WordRow";
import { Button, List, ListItem } from "@mui/material";
import BackButton from "../items/BackButton";

function WordList({ words, sort, learn, setSort, setLearn }) {
  const [answers, setAnswers] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!answers.length) {
      setAnswers(
        words.map((row) => {
          return sort === 0 ? false : row.tagID === sort ? false : null;
        })
      );
    }
  }, [answers, sort, words, words.length]);

  const handleClick = () => {
    setSubmit(true);
  };

  return sort === -1 ? (
    <StartView learn={learn} setSort={setSort} setLearn={setLearn} />
  ) : (
    <>
      <List
        sx={{
          bgcolor: "lightblue",
          pr: "16px",
          pl: "16px",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        <BackButton learn={learn} setSort={setSort} setLearn={setLearn} />
        {words.map((row, index) =>
          sort === 0 ? (
            <WordRow
              row={row}
              index={index}
              submit={submit}
              answers={answers}
              setAnswers={setAnswers}
            />
          ) : row.tagID === sort ? (
            <WordRow
              row={row}
              index={index}
              submit={submit}
              answers={answers}
              setAnswers={setAnswers}
            />
          ) : null
        )}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            size="medium"
            margin="dense"
            onClick={handleClick}
          >
            Check answers
          </Button>
        </ListItem>
      </List>
    </>
  );
}

export default WordList;
