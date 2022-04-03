import React, { useState, useEffect } from "react";

import { api } from "../../utils/api";
import { useHistory } from "react-router-dom";

import { useStyles } from "./styles";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  TextField,
} from "@material-ui/core";

export default function Main() {
  const classes = useStyles();
  const history = useHistory();

  const [login, setLogin] = useState("");

  useEffect(() => {
    async function validate() {
      api
        .get("/validate", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((_res) => {
          history.replace("/profile");
        })
        .catch((_err) => {
          localStorage.removeItem("token");
        });
    }
    validate();
    const navigate = async () => {
      const authorized = await validate();
      if (authorized) {
        history.push("/profile");
      }
    };
    navigate();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    api
      .post("/login", { login })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.replace("/profile");
        window.location.reload();
      })
      .catch((_err) => {});
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Box className={classes.buttonContainer}>
        <form className={classes.form}>
          <TextField
            label="Login"
            variant="outlined"
            value={login}
            onInput={(e) => setLogin(e.target.value)}
          />
          <Button
            type="submit"
            style={{ marginLeft: "1em" }}
            variant="contained"
            color="primary"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
