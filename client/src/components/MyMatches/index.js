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
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

function Match(props) {
  const { id, homeGoals, awayGoals, result, match } = props;

  const [open, setOpen] = useState(false);
  const [homeGoalsState, setHomeGoalsState] = useState("");
  const [awayGoalsState, setAwayGoalsState] = useState("");
  const [resultState, setResultState] = useState("");

  const handleOpen = () => {
    const matchDate = new Date(match.date);
    const currentDate = new Date();
    if (currentDate.getTime() - matchDate.getTime() < 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveResult = () => {
    api
      .put(
        `/usermatches/${id}`,
        {
          homeGoals: homeGoalsState,
          awayGoals: awayGoalsState,
          result: resultState,
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

  const handlaResultChange = (event) => {
    setResultState(event.target.value);
  };

  const getCursor = () => {
    const matchDate = new Date(match.date);
    const currentDate = new Date();
    if (currentDate.getTime() - matchDate.getTime() < 0) {
      return "pointer";
    }
    return "default";
  };

  const getPaperBackground = (result, homeGoals, awayGoals, match) => {
    console.log("result", result);
    console.log("match result", match.result);
    if (
      result &&
      match.result &&
      result.includes(match.result) &&
      homeGoals === match.homeGoals &&
      awayGoals === match.awayGoals
    ) {
      return "#00FF0033";
    } else if (
      result &&
      match.result &&
      (result.includes(match.result) ||
        (homeGoals === match.homeGoals && awayGoals === match.awayGoals))
    ) {
      return "#FFFF0033";
    } else if (
      result &&
      match.result &&
      !result.includes(match.result) &&
      (homeGoals !== match.homeGoals || awayGoals !== match.awayGoals)
    ) {
      return "#FF000022";
    }
    return "#FFFFFF";
  };

  return (
    <Container>
      <Paper
        onClick={handleOpen}
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "0.5em",
          cursor: getCursor(),
          backgroundColor: getPaperBackground(
            result,
            homeGoals,
            awayGoals,
            match
          ),
        }}
      >
        <Typography variant="h5" style={{ margin: "auto", fontWeight: "bold" }}>
          {formatTime(match.date)}
        </Typography>
        <Typography
          style={{ margin: "auto", marginBottom: "1em" }}
        >{`Group: ${match.group}`}</Typography>
        <Box
          style={{
            display: "flex",
            marginBottom: "0.5em",
            alignItems: "center",
            justifyContent: "center",
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
              <td>
                <Typography
                  style={{ display: "flex" }}
                >{`${match.homeTeam.country}`}</Typography>
              </td>
              <td>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: "bold", color: "#00FF00" }}
                  >
                    {homeGoals !== null ? `${homeGoals}` : `-`}
                  </Typography>
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "bold",
                      color: "#FF0000",
                      textAlign: "center",
                    }}
                  >
                    {match.homeGoals !== null ? `${match.homeGoals}` : `-`}
                  </Typography>
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "bold",
                      color: "#FF0000",
                      textAlign: "center",
                    }}
                  >
                    {match.etHome !== null ? `(${match.etHome})` : ``}
                  </Typography>
                </Box>
              </td>
              <td>
                <Typography variant="h6">:</Typography>
              </td>
              <td>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: "bold", color: "#00FF00" }}
                  >
                    {awayGoals !== null ? `${awayGoals}` : `-`}
                  </Typography>
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "bold",
                      color: "#FF0000",
                      textAlign: "center",
                    }}
                  >
                    {match.awayGoals !== null ? `${match.awayGoals}` : `-`}
                  </Typography>
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "bold",
                      color: "#FF0000",
                      textAlign: "center",
                    }}
                  >
                    {match.etAway !== null ? `(${match.etAway})` : ``}
                  </Typography>
                </Box>
              </td>
              <td style={{ textAlign: "right" }}>
                <Typography>{`${match.awayTeam.country}`}</Typography>
              </td>
            </tr>
          </table>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {result ? (
            <Typography
              variant="h5"
              style={{
                margin: "auto",
                marginTop: "1em",
                color: "#00AA00",
                fontWeight: "bold",
              }}
            >{`My result: ${result}`}</Typography>
          ) : (
            <Typography
              variant="h5"
              style={{
                margin: "auto",
                marginTop: "1em",

                color: "#00AA00",
                fontWeight: "bold",
              }}
            >{`My result: -`}</Typography>
          )}
          {match.result ? (
            <Typography
              variant="h7"
              style={{
                margin: "auto",
                marginBottom: "1em",
                color: "#AA0000",
                fontWeight: "bold",
              }}
            >{`Match result: ${match.result}`}</Typography>
          ) : (
            <Typography
              variant="h7"
              style={{
                margin: "auto",
                marginBottom: "1em",
                color: "#AA0000",
                fontWeight: "bold",
              }}
            >{`Match result: -`}</Typography>
          )}
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
            <Typography>{`${match.homeTeam.country}`}</Typography>
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
            <Typography>{`${match.awayTeam.country}`}</Typography>

            <FormControl style={{ marginLeft: "1em", width: "5em" }}>
              <InputLabel>Winner</InputLabel>

              <Select
                native
                value={resultState}
                onChange={handlaResultChange}
                inputProps={{
                  name: "Home",
                }}
              >
                <option aria-label="None" value="" />
                <option value="1">1</option>
                <option value="0">0</option>
                <option value="2">2</option>
                <option value="10">10</option>
                <option value="02">02</option>
                <option value="12">12</option>
              </Select>
            </FormControl>
          </Box>
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
        </Paper>
      </Modal>
    </Container>
  );
}

export default function MyMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMyMatches();
  }, []);

  const getMyMatches = () => {
    api
      .get("/usermatches", {
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
            match={e.match}
            result={e.result}
            homeGoals={e.homeGoals}
            awayGoals={e.awayGoals}
          />
        );
      })}
    </>
  );
}
