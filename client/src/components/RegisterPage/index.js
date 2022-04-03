import { Container, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";

import { api } from "../../utils/api";

export default function RegisterPage() {
  const [login, setLogin] = useState("");

  const handleRegister = () => {
    api
      .post("register", { login })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        // add entry to eurowinner table
        api
          .post(
            "/eurowinner",
            { login },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data.message);
          });
        // get all matches
        api
          .get("/matches", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            res.data.matches.map((e) => {
              api
                .post(
                  "/usermatches",
                  { id: e._id, user: login },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                });
            });
            console.log(res.data);
          });
      })
      .catch((err) => {});
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  return (
    <Container>
      <TextField
        variant="outlined"
        label="Register"
        value={login}
        onChange={handleLoginChange}
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}
