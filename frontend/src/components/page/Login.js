import React, { useState } from "react";
import { TextField } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <TextField
        label="Username"
        value={username}
        sx={{ m: 1, mt: 4, width: "25ch", justifySelf: "center" }}
        onChange={handleUsernameChange}
      />
    </>
  );
}

export default Login;
