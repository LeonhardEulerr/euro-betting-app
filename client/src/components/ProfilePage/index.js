import React, { useContext } from "react";
import { useStyles } from "./styles";

import {
  Button,
  Container,
  CssBaseline,
  Box,
  Typography,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { UserContext } from "../../Contexts/userContext";

export default function Profile() {
  const classes = useStyles();
  const history = useHistory();

  const { username } = useContext(UserContext);

  const handleShowMatches = () => {
    history.push("/matches");
  };

  const handleMyMatches = () => {
    history.push("/mymatches");
  };

  const handleRanking = () => {
    history.push("/ranking");
  };

  const handleEuroWinner = () => {
    history.push("/eurowinner");
  };

  const handleRealEuroWinner = () => {
    history.push("/realeurowinner");
  };

  return (
    <Container
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Typography
        variant="h5"
        style={{
          marginTop: "1em",
          display: "flex",
          fontWeight: "bold",
        }}
      >
        Welcome {username}
      </Typography>
      <Box className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleMyMatches}
        >
          My bets
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleEuroWinner}
        >
          My Euro Winner
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleRanking}
        >
          Ranking
        </Button>
        {/* <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleAddMatches}
        >
          Add matches
        </Button> */}
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleShowMatches}
        >
          Results
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleRealEuroWinner}
        >
          Euro winner is...
        </Button>
      </Box>
      <Box>
        <Typography style={{ fontSize: "0.5em", textAlign: "center" }}>
          *W związku z późnym dołączeniem do turnieju (organizowanego przez Radę
          Nadzorczą i Komisję Gier i Zakładów Sportowych, w których skład
          wchodzą: Kajetan, Leonhard, Mikołaj oraz muerte) jednego z graczy
          (Szmyku) postanowiono, iż nagrodę specjalną ufunduje wcześniej
          wspomniany Szmyku. Nagroda specjalna to Stiletto Knife | Case
          Hardened.
        </Typography>
      </Box>
    </Container>
  );
}
