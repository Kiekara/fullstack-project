import React from "react";
import TagButton from "../items/TagButton";
import LearnButton from "../items/LearnButton";
import AddTagForm from "../items/AddTagForm";
import { Stack } from "@mui/material";

function TagList({
  rights,
  tags,
  words,
  learn,
  setSort,
  setLearn,
  getData,
  api,
}) {
  return (
    <>
      <Stack spacing={2}>
        <h3>Choose a category</h3>
        <LearnButton learn={learn} setSort={setSort} setLearn={setLearn} />
        {tags.map((tag) => (
          <TagButton
            rights={rights}
            tag={tag}
            words={words}
            learn={learn}
            setSort={setSort}
            setLearn={setLearn}
          />
        ))}
        <AddTagForm rights={rights} tags={tags} getData={getData} api={api} />
      </Stack>
    </>
  );
}

export default TagList;
