import React, { useState } from "react";
import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function WordRow({
  row,
  index,
  edit,
  submit,
  answers,
  setAnswers,
  getData,
  api,
}) {
  const { id, wordEng, wordFin } = row;
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

  const handleDelete = async () => {
    await api.deleteData("words", id);
    let data = await getData("words");
    console.log(data);
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={wordEng} />
        {submit && answers[index] ? (
          <TextField
            focused
            inputProps={{ readOnly: true }}
            label="Correct"
            value={input}
            variant="filled"
            color="success"
            size="small"
            margin="dense"
            sx={{ width: "50%" }}
            onChange={handleChange}
          />
        ) : submit && !answers[index] ? (
          <TextField
            error
            inputProps={{ readOnly: true }}
            label="Incorrect"
            value={input}
            variant="filled"
            size="small"
            margin="dense"
            sx={{ width: "50%" }}
            onChange={handleChange}
          />
        ) : (
          <TextField
            hiddenLabel
            value={input}
            variant="filled"
            size="small"
            margin="dense"
            sx={{ width: "50%" }}
            onChange={handleChange}
          />
        )}
        {edit ? (
          <span style={{ paddingLeft: "8px" }}>
            <IconButton size="medium" color="primary">
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
            <IconButton size="medium" color="error" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </span>
        ) : null}
      </ListItem>
    </>
  );
}

export default WordRow;
