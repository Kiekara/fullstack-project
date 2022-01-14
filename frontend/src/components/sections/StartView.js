import React from "react";
import LearnButton from "../items/LearnButton";
import { Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

function StartView({ learn, swap, setSort, setLearn, setSwap }) {
  return (
    <>
      <Box mr={"60px"} ml={"60px"}>
        <h3>Welcome to my language learning app!</h3>
        <br />
        <br />
        <p>Choose which way you want to practise</p>
        <br />
        <Box>
          <IconButton size="medium" color="primary">
            <FontAwesomeIcon icon={faExchangeAlt} />
          </IconButton>
        </Box>
        <br />
        <p>
          You can start learning languages straight away by selecting a category
          from the left or just practise with random words
        </p>
        <br />
        <LearnButton learn={learn} setSort={setSort} setLearn={setLearn} />
      </Box>
    </>
  );
}

export default StartView;
