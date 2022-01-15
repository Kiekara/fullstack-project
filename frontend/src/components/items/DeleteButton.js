// Import modules
import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for deleting a tag category
 * @param {Object} props Component props
 * @param {string} props.rights User rights
 * @param {number} props.sort Used for sorting by tag
 * @param {()} props.setSort Used for changing sort state
 * @param {()} props.setLearn Used for changing learn state
 * @param {()} props.getData Used for fetching data from database
 * @param {{}} props.api Stores other database connection functions
 * @returns
 */
function DeleteButton({ rights, sort, setSort, setLearn, getData, api }) {
  // Delete tags
  const handleDelete = async () => {
    await api.deleteData("tags", sort);
    let data = await getData("tags");
    console.log(data);
    setSort(-1);
    setLearn(false);
  };

  return sort !== 0 && rights === "admin" ? (
    <>
      <Button
        variant="contained"
        color="error"
        size="medium"
        startIcon={<FontAwesomeIcon icon={faTrash} />}
        onClick={handleDelete}
      >
        Delete category
      </Button>
    </>
  ) : null;
}

export default DeleteButton;
