// Import modules
import React, { useState, useEffect } from "react";
import StartView from "./StartView";
import EditButton from "../items/EditButton";
import BackButton from "../items/BackButton";
import DeleteButton from "../items/DeleteButton";
import QuitButton from "../items/QuitButton";
import WordRow from "../items/WordRow";
import AddWordRow from "../items/AddWordRow";
import EditTagForm from "../items/EditTagForm";
import { Button, List, ListItem } from "@mui/material";

/**
 * Component for listing word pairs and a couple of buttons
 * @param {Object} props Component props
 * @param {string} props.rights User rights
 * @param {Array} props.words Word pairs
 * @param {Array} props.tags Tags
 * @param {number} props.sort Used for sorting by tag
 * @param {boolean} props.learn Indicates if user has opened a test
 * @param {boolean} props.swap Indicates if user has swapped language order
 * @param {()} props.setSort Used for changing sorting state
 * @param {()} props.setLearn Used for changing learning state
 * @param {()} props.setSwap Used for changing swapping state
 * @param {()} props.getData Used for fetching data from database
 * @param {{}} props.api Stores other database connection functions
 * @returns
 */
function WordList({
  rights,
  words,
  tags,
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
  const [percentage, setPercentage] = useState(0);

  // Initialize null answers
  useEffect(() => {
    if (!answers.length) {
      setAnswers(
        words.map((row) => {
          return sort === 0 ? false : row.tagID === sort ? false : null;
        })
      );
    }
  }, [answers, sort, submit, words]);

  // Function for submit and score calculation
  const handleClick = () => {
    let answersRight = answers
      .filter((answer) => answer !== null)
      .filter((answer) => answer !== false).length;

    let questionsTotal = "";

    if (sort !== 0) {
      questionsTotal = words.filter((row) => row.tagID === sort).length;
    } else {
      questionsTotal = words.length;
    }

    setPercentage((answersRight / questionsTotal) * 100);

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
            setAnswers={setAnswers}
            setPercentage={setPercentage}
          />
          {!edit ? (
            <EditButton rights={rights} sort={sort} setEdit={setEdit} />
          ) : (
            <QuitButton setEdit={setEdit} />
          )}
          <DeleteButton
            rights={rights}
            sort={sort}
            setSort={setSort}
            setLearn={setLearn}
            getData={getData}
            api={api}
          />
        </ListItem>
        {edit
          ? tags.map((tag) =>
              tag.id === sort ? (
                <EditTagForm
                  tag={tag}
                  tags={tags}
                  setEdit={setEdit}
                  getData={getData}
                  api={api}
                />
              ) : null
            )
          : null}
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
          <AddWordRow sort={sort} swap={swap} getData={getData} api={api} />
        )}
        {submit ? (
          <>
            <br />
            <p>You got {percentage.toFixed(2)}% of the questions right</p>
            <br />
          </>
        ) : null}
      </List>
    </>
  );
}

export default WordList;
