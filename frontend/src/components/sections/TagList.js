import React from "react";
import TagButton from "../items/TagButton";
import BackButton from "../items/BackButton";
import LearnButton from "../items/LearnButton";
import { Stack } from "@mui/material";

function TagList({ tags, learn, setSort, setLearn }) {
  return (
    <>
      <Stack spacing={2}>
        <h3>Choose a category</h3>
        <BackButton learn={learn} setSort={setSort} setLearn={setLearn} />
        <LearnButton learn={learn} setSort={setSort} setLearn={setLearn} />
        {tags.map((tag) => (
          <TagButton
            tag={tag}
            learn={learn}
            setSort={setSort}
            setLearn={setLearn}
          />
        ))}
      </Stack>
    </>
  );
}

export default TagList;
