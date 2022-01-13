import React, { useState } from "react";
import { ListItem, ListItemText, TextField } from "@mui/material";

function WordRow({ row, index, answers, setAnswers }) {
  const { wordEng, wordFin } = row;
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    let inputValue = event.target.value;
    setInput(inputValue);

    if (inputValue === wordFin) {
      setAnswers(
        answers.map((answer, idx) => {
          return idx === index ? true : answer;
        })
      );
    } else {
      setAnswers(
        answers.map((answer, idx) => {
          return idx === index ? false : answer;
        })
      );
    }
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={wordEng} />
        <TextField
          hiddenLabel
          value={input}
          variant="filled"
          size="small"
          margin="dense"
          sx={{ width: "50%" }}
          onChange={handleChange}
        />
      </ListItem>
    </>
  );
}

export default WordRow;
