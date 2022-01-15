// Import modules
import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for escaping to main menu
 * @param {Object} props Component props
 * @param {()} props.setSort Used for changing sort state
 * @param {()} props.setLearn Used for changing learn state
 * @param {()} props.setEdit Used for changing edit state
 * @param {()} props.setSubmit used for changing submit state
 * @param {()} props.setAnswers used for changing answers state
 * @param {()} props.setPercentage used for changing percentage state
 * @returns
 */
function BackButton({
  setSort,
  setLearn,
  setEdit,
  setSubmit,
  setAnswers,
  setPercentage,
}) {
  // Reset everything
  const handleClick = () => {
    setSort(-1);
    setLearn(false);
    setEdit(false);
    setSubmit(false);
    setAnswers([]);
    setPercentage(0);
  };

  return (
    <>
      <Button
        variant="contained"
        size="medium"
        startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        onClick={handleClick}
      >
        Go back
      </Button>
    </>
  );
}

export default BackButton;
