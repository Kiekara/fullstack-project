// Import modules
import React from "react";
import { Button } from "@mui/material";

/**
 * Component for learning random words
 * @param {Object} props Component props
 * @param {boolean} props.learn Indicates if user has opened a test
 * @param {()} props.setSort Used for changing sort state
 * @param {()} props.setLearn Used for changing learn state
 * @returns
 */
function LearnButton({ learn, setSort, setLearn }) {
  const handleClick = () => {
    setSort(0);
    setLearn(true);
  };

  return !learn ? (
    <>
      <Button variant="contained" size="medium" onClick={handleClick}>
        Learn random words
      </Button>
    </>
  ) : (
    <>
      <Button disabled variant="contained" size="medium">
        Learn random words
      </Button>
    </>
  );
}

export default LearnButton;
