// Import modules
import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for editing tag category
 * @param {Object} props Component props
 * @param {string} props.rights User rights
 * @param {number} props.sort Used for sorting by tag
 * @param {()} props.setEdit Used for changing edit state
 * @returns
 */
function EditButton({ rights, sort, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  return sort !== 0 && rights === "admin" ? (
    <span style={{ marginRight: "auto", marginLeft: "auto" }}>
      <Button
        variant="contained"
        size="medium"
        startIcon={<FontAwesomeIcon icon={faEdit} />}
        onClick={handleEdit}
      >
        Edit category
      </Button>
    </span>
  ) : null;
}

export default EditButton;
