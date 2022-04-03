import React, { useEffect, useState } from "react";

import { api } from "../../utils/api";
import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

function Match(props) {
  const {
    id,
    date,
    homeTeam,
    awayTeam,
    homeGoals,
    awayGoals,
    etHome,
    etAway,
    group,
  } = props;

  const [open, setOpen] = useState(false);
  const [homeGoalsState, setHomeGoalsState] = useState("");
  const [awayGoalsState, setAwayGoalsState] = useState("");
  const [etHomeState, setEtHomeState] = useState("");
  const [etAwayState, setEtAwayState] = useState("");
  const [etState, setEtState] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPaperBackgroundForCurrentMatches = () => {
    const matchDate = new Date(date);
    const currentDate = new Date();
    if (
      currentDate.getDate() === matchDate.getDate() &&
      currentDate.getMonth() === matchDate.getMonth()
    ) {
      return "#00FF0033";
    }
    return "FFFFFF";
  };

  const saveResult = () => {
    api
      .put(
        `/matches/${id}`,
        {
          et: etState,
          homeGoals: homeGoalsState,
          awayGoals: awayGoalsState,
          etHome: etHomeState,
          etAway: etAwayState,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        window.location.reload();
      })
      .catch((_err) => {
        console.log("error", _err);
      });
  };

  const formatTime = (d) => {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes === 0) {
      minutes = "00";
    }

    return `${day}/${month} ${hours}:${minutes}`;
  };

  const handleETChange = (event) => {
    setEtState(event.target.checked);
  };

  return (
    <Container>
      <Paper
        onClick={handleOpen}
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "0.5em",
          cursor: "pointer",
          backgroundColor: getPaperBackgroundForCurrentMatches(),
        }}
      >
        <Typography
          variant="h5"
          style={{ margin: "auto", fontWeight: "bold", marginTop: "0.5em" }}
        >
          {formatTime(date)}
        </Typography>
        <Typography
          style={{ margin: "auto", marginBottom: "1em" }}
        >{`Group: ${group}`}</Typography>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
        >
          <table
            style={{
              width: "80%",
              tableLayout: "fixed",
              textAlign: "center",
            }}
          >
            <tr>
              <td style={{ textAlign: "left" }}>
                <Typography>{`${homeTeam.country}`}</Typography>
              </td>
              <td>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", color: "#FF0000" }}
                >
                  {homeGoals !== null ? `${homeGoals}` : `-`}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", color: "#FF0000" }}
                >
                  {etHome !== null ? `(${etHome})` : ``}
                </Typography>
              </td>
              <td>
                <Typography variant="h6">:</Typography>
              </td>
              <td>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", color: "#FF0000" }}
                >
                  {awayGoals !== null ? `${awayGoals}` : `-`}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", color: "#FF0000" }}
                >
                  {etAway !== null ? `(${etAway})` : ``}
                </Typography>
              </td>
              <td style={{ textAlign: "right" }}>
                <Typography>{`${awayTeam.country}`}</Typography>
              </td>
            </tr>
          </table>
        </Box>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper style={{ padding: "3em" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "0.5em",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "0.5em",
                alignItems: "center",
              }}
            >
              <Typography>{`${homeTeam.country}`}</Typography>
              <TextField
                type="number"
                variant="outlined"
                style={{ width: "60px", marginLeft: "1em", marginRight: "1em" }}
                value={homeGoalsState}
                onInput={(e) => setHomeGoalsState(e.target.value)}
              />
              <Typography variant="h6">:</Typography>

              <TextField
                type="number"
                variant="outlined"
                style={{ width: "60px", marginLeft: "1em", marginRight: "1em" }}
                value={awayGoalsState}
                onInput={(e) => setAwayGoalsState(e.target.value)}
              />
              <Typography>{`${awayTeam.country}`}</Typography>
            </Box>
          </Box>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={etState}
                  onChange={handleETChange}
                  color="primary"
                />
              }
              label="ET"
              labelPlacement="start"
            />
          </Box>

          {etState ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "0.5em",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "0.5em",
                  alignItems: "center",
                }}
              >
                <Typography>{`${homeTeam.country}`}</Typography>
                <TextField
                  type="number"
                  variant="outlined"
                  style={{
                    width: "60px",
                    marginLeft: "1em",
                    marginRight: "1em",
                  }}
                  value={etHomeState}
                  onInput={(e) => setEtHomeState(e.target.value)}
                />
                <Typography variant="h6">:</Typography>

                <TextField
                  type="number"
                  variant="outlined"
                  style={{
                    width: "60px",
                    marginLeft: "1em",
                    marginRight: "1em",
                  }}
                  value={etAwayState}
                  onInput={(e) => setEtAwayState(e.target.value)}
                />
                <Typography>{`${awayTeam.country}`}</Typography>
              </Box>
            </Box>
          ) : null}
          <Box
            style={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                saveResult();
                handleClose();
              }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
}

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = () => {
    api
      .get("/matches", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMatches(res.data.matches);
        console.log(res.data);
      });
  };

  return (
    <>
      {matches.map((e, i) => {
        return (
          <Match
            id={e._id}
            key={i}
            group={e.group}
            homeTeam={e.homeTeam}
            awayTeam={e.awayTeam}
            homeGoals={e.homeGoals}
            awayGoals={e.awayGoals}
            etHome={e.etHome}
            etAway={e.etAway}
            date={e.date}
          />
        );
      })}
    </>
  );
}
