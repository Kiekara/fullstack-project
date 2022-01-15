// Import modules
import React from "react";
import TagButton from "../items/TagButton";
import LearnButton from "../items/LearnButton";
import AddTagForm from "../items/AddTagForm";
import { Stack } from "@mui/material";

/**
 * Component for listing tags
 * @param {Object} props Component props
 * @param {string} props.rights User rights
 * @param {Array} props.tags Tags
 * @param {Array} props.words Word pairs
 * @param {boolean} props.learn Indicates if user has opened a test
 * @param {()} props.setSort Used for changing sorting state
 * @param {()} props.setLearn Used for changing learning state
 * @param {()} props.getData Used for fetching data from database
 * @param {{}} props.api Stores other database connection functions
 * @returns
 */
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
