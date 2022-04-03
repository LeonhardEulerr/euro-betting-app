import React, { useEffect, useState } from "react";

import { api } from "../../utils/api";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

function EuroWinnerPaper(props) {
  const { team } = props;

  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [winnerId, setWinnerId] = useState(team ? team : "");

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    api
      .get("/teams")
      .then((res) => {
        setTeams(res.data.teams);
        console.log(res.data.teams);
      })
      .catch((_err) => {
        console.log("error while getting teams");
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWinnerChange = (event) => {
    setWinnerId(event.target.value);
    console.log("asdsadasdasdas", event.target.value);
  };

  const saveResult = () => {
    console.log("winner id", winnerId);
    api
      .put(
        `/realeurowinner`,
        { country: winnerId },
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

  return (
    <Container>
      <Paper
        onClick={handleOpen}
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "0.5em",
          cursor: "pointer",
        }}
      >
        {team && team.country ? (
          <Typography
            variant="h5"
            style={{ margin: "auto", fontWeight: "bold" }}
          >
            {`EURO 2021 winner is: ${team.country}`}
          </Typography>
        ) : (
          <Typography
            variant="h5"
            style={{ margin: "auto", fontWeight: "bold" }}
          >
            {`EURO 2021 winner is: -`}
          </Typography>
        )}
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
            <FormControl>
              <InputLabel>Winner</InputLabel>
              {teams ? (
                <Select
                  native
                  value={winnerId}
                  onChange={handleWinnerChange}
                  inputProps={{
                    name: "Winner",
                  }}
                >
                  <option aria-label="None" value="" />
                  {teams.map((e, i) => {
                    return (
                      <option key={i} value={e.country}>
                        {e.country}
                      </option>
                    );
                  })}
                </Select>
              ) : null}
            </FormControl>

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

export default function RealEuroWinner() {
  const [team, setTeam] = useState(undefined);

  useEffect(() => {
    getRealEuroWinner();
  }, []);

  const getRealEuroWinner = () => {
    api
      .get("/realeurowinner", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTeam(res.data.winner);
        console.log(res.data.winner);
      });
  };

  return (
    <>
      {/* {console.log(team)} */}
      <EuroWinnerPaper style={{ margin: "auto" }} team={team} />
    </>
  );
}
