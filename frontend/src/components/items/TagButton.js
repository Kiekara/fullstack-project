// Import modules
import React from "react";
import { Button } from "@mui/material";

/**
 * Component for sorting words by tag
 * @param {Object} props Component props
 * @param {string} props.rights User rights
 * @param {{}} props.tag Stores tag id and name
 * @param {Array} props.words Word pairs
 * @param {boolean} props.learn Indicates if user has opened a test
 * @param {()} props.setSort Used for changing sorting state
 * @param {()} props.setLearn Used for changing learning state
 * @returns
 */
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
