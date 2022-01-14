import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteButton({ rights, sort, setSort, setLearn, getData, api }) {
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
