// Import modules
import React, { useState, useEffect } from "react";
import EditWordRow from "./EditWordRow";
import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for showing word pairs
 * @param {Object} props Component props
 * @param {{}} props.row Stores words and tag id
 * @param {number} props.index Helps distinguish row from each other
 * @param {boolean} props.swap Indicates if user has swapped language order
 * @param {boolean} props.edit Indicates if edit state is on
 * @param {boolean} props.submit Indicates if the words have been submitted
 * @param {Array} props.answers Answer values for each answer
 * @param {()} props.setAnswers Used for changing answers state
 * @param {()} props.getData Used for fetching data from database
 * @param {{}} props.api Stores other database connection functions
 * @returns
 */
function WordRow({
  row,
  index,
  swap,
  edit,
  submit,
  answers,
  setAnswers,
  getData,
  api,
}) {
  const { id, wordEng, wordFin } = row;
  const [input, setInput] = useState("");
  const [rowEdit, setRowEdit] = useState(false);
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");

  // Check which language is in primary position
  useEffect(() => {
    if (!swap) {
      setPrimary(wordEng);
      setSecondary(wordFin);
    } else {
      setPrimary(wordFin);
      setSecondary(wordEng);
    }
  }, [swap, wordEng, wordFin]);

  const handleChange = (event) => {
    let inputValue = event.target.value;
    setInput(inputValue);

    // Compare input the case insensitive way
    if (inputValue.toUpperCase() === secondary.toUpperCase()) {
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

  const handleEdit = () => {
    setRowEdit(true);
  };

  // Delete words
  const handleDelete = async () => {
    await api.deleteData("words", id);
    let data = await getData("words");
    console.log(data);
  };

  return rowEdit ? (
    <EditWordRow
      row={row}
      swap={swap}
      primary={primary}
      secondary={secondary}
      setRowEdit={setRowEdit}
      getData={getData}
      api={api}
    />
  ) : (
    <>
      <ListItem key={id}>
        <ListItemText primary={primary} />
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
            <IconButton size="medium" color="primary" onClick={handleEdit}>
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
