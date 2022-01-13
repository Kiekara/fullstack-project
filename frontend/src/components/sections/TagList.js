import React from "react";
import TagButton from "../items/TagButton";
import { Stack } from "@mui/material";

function TagList({ tags, setSort }) {
  return (
    <>
      <Stack spacing={2}>
        <h3>Choose a category</h3>
        {tags.map((tag) => (
          <TagButton tag={tag} setSort={setSort} />
        ))}
      </Stack>
    </>
  );
}

export default TagList;
