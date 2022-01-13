import React from "react";
import TagButton from "../items/TagButton";
import { Stack } from "@mui/material";

function TagList({ tags }) {
  return (
    <>
      <Stack spacing={2}>
        {tags.map((tag) => (
          <TagButton tag={tag} />
        ))}
      </Stack>
    </>
  );
}

export default TagList;
