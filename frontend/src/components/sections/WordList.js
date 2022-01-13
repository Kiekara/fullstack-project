import React, { useState, useEffect } from "react";
import StartView from "./StartView";
import WordRow from "../items/WordRow";
import BackButton from "../items/BackButton";
import DeleteButton from "../items/DeleteButton";
import { Button, List, ListItem } from "@mui/material";
import EditButton from "../items/EditButton";

function WordList({ words, sort, learn, setSort, setLearn, getData, api }) {
  const [answers, setAnswers] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [edit, setEdit] = useState(false);

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
        <ListItem>
          <BackButton
            learn={learn}
            setSort={setSort}
            setLearn={setLearn}
            setEdit={setEdit}
            setSubmit={setSubmit}
          />
          <EditButton setEdit={setEdit} />
          <DeleteButton
            sort={sort}
            setSort={setSort}
            setLearn={setLearn}
            getData={getData}
            api={api}
          />
        </ListItem>
        {words.map((row, index) =>
          sort === 0 ? (
            <WordRow
              row={row}
              index={index}
              edit={edit}
              submit={submit}
              answers={answers}
              setAnswers={setAnswers}
              getData={getData}
              api={api}
            />
          ) : row.tagID === sort ? (
            <WordRow
              row={row}
              index={index}
              edit={edit}
              submit={submit}
              answers={answers}
              setAnswers={setAnswers}
              getData={getData}
              api={api}
            />
          ) : null
        )}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            size="medium"
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
