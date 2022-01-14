import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [passValues, setPassValues] = useState({
    password: "",
    showPassword: false,
  });
  const [username, setUsername] = useState("");

  const handlePasswordChange = (prop) => (event) => {
    setPassValues({ ...passValues, [prop]: event.target.value });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClickShowPassword = () => {
    setPassValues({
      ...passValues,
      showPassword: !passValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        label="Username"
        value={username}
        sx={{ m: 1, mt: 4, width: "25ch", justifySelf: "center" }}
        onChange={handleUsernameChange}
      />
      <FormControl
        sx={{ m: 1, width: "25ch", justifySelf: "center" }}
        variant="outlined"
      >
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          type={passValues.showPassword ? "text" : "password"}
          value={passValues.password}
          onChange={handlePasswordChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {passValues.showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="password"
        />
      </FormControl>
    </>
  );
}

export default Login;
