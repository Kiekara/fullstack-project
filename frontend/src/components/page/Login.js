// Import modules
import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for login screen, when login session isn't going on
 * @param {Object} props Component props
 * @param {string} props.setRights State setter for user rights
 * @returns
 */
function Login({ setRights }) {
  const [passValues, setPassValues] = useState({
    password: "",
    showPassword: false,
  });
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  // Enter password
  const handlePasswordChange = (prop) => (event) => {
    setPassValues({ ...passValues, [prop]: event.target.value });
  };

  // Enter username
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Show password
  const handleClickShowPassword = () => {
    setPassValues({
      ...passValues,
      showPassword: !passValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Send credentials to backend
  const handleLogin = async () => {
    if (username && passValues.password) {
      const data = {
        username: username,
        password: passValues.password,
      };

      let response = await fetch("/login/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();

      if ("rights" in result) {
        setRights(result.rights);
      } else {
        setError(true);
        setErrormsg(result.msg);
        console.log(result);
      }
    }

    setUsername("");
    setPassValues({ ...passValues, password: "" });
  };

  return (
    <>
      {/** Ask username */}
      <TextField
        label="Username"
        value={username}
        sx={{ m: 1, mt: 4, width: "25ch", justifySelf: "center" }}
        onChange={handleUsernameChange}
      />
      {/** Ask password */}
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
      {/** Notify possible error */}
      {error ? <p style={{ color: "red" }}>{errormsg}</p> : null}
      {/** Submit credentials */}
      <Button
        variant="contained"
        size="medium"
        sx={{ m: 1, width: "27ch" }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </>
  );
}

export default Login;
