import React, { useState, useEffect } from "react";
import StartView from "./StartView";
import WordRow from "../items/WordRow";
import BackButton from "../items/BackButton";
import DeleteButton from "../items/DeleteButton";
import { Button, List, ListItem } from "@mui/material";
import EditButton from "../items/EditButton";
import WordRowForm from "../items/WordRowForm";

function WordList({
  words,
  sort,
  learn,
  swap,
  setSort,
  setLearn,
  setSwap,
  getData,
  api,
}) {
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
    <StartView
      learn={learn}
      swap={swap}
      setSort={setSort}
      setLearn={setLearn}
      setSwap={setSwap}
    />
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
              swap={swap}
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
              swap={swap}
              edit={edit}
              submit={submit}
              answers={answers}
              setAnswers={setAnswers}
              getData={getData}
              api={api}
            />
          ) : null
        )}
        {!edit ? (
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
        ) : (
          <WordRowForm swap={swap} getData={getData} api={api} />
        )}
      </List>
    </>
  );
}

export default WordList;
