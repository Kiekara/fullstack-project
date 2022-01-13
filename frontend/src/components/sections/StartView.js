import React from "react";
import LearnButton from "../items/LearnButton";
import { Box } from "@mui/material";

function StartView({ learn, setSort, setLearn }) {
  return (
    <>
      <Box mr={"60px"} ml={"60px"}>
        <h3>Welcome to my language learning app!</h3>
        <br />
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
