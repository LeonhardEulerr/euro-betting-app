import { Container, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";

import { api } from "../../utils/api";

export default function AddTeam() {
  const [country, setCountry] = useState("");

  const addTeam = () => {
    api
      .post("/team", { country })
      .then((res) => {
        console.log(res.data.message);
        setCountry("");
      })
      .catch((_err) => {
        console.log("error while adding team");
      });
  };

  return (
    <Container style={{ display: "flex" }}>
      <TextField
        type="text"
        variant="outlined"
        label="Team"
        value={country}
        onInput={(e) => setCountry(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addTeam}>
        Add team
      </Button>
    </Container>
  );
}
