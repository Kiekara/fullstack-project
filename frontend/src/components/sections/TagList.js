import React from "react";
import TagButton from "../items/TagButton";
import LearnButton from "../items/LearnButton";
import { Stack } from "@mui/material";
import AddTagForm from "../items/AddTagForm";

function TagList({ tags, learn, setSort, setLearn, getData, api }) {
  return (
    <>
      <Stack spacing={2}>
        <h3>Choose a category</h3>
        <LearnButton learn={learn} setSort={setSort} setLearn={setLearn} />
        {tags.map((tag) => (
          <TagButton
            tag={tag}
            learn={learn}
            setSort={setSort}
            setLearn={setLearn}
          />
        ))}
        <AddTagForm getData={getData} api={api} />
      </Stack>
    </>
  );
}

export default TagList;
