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
  const { winner } = props;

  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [winnerId, setWinnerId] = useState(winner ? winner.country : "");

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
    // const matchDate = new Date(date);
    // const currentDate = new Date();
    // if (currentDate.getTime() - matchDate.getTime() < 0) {
    //   setOpen(true);
    // }
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
    api
      .put(
        `/eurowinner/${winner._id}`,
        { winner: winnerId },
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
        {winner && winner.team ? (
          <Typography
            variant="h5"
            style={{ margin: "auto", fontWeight: "bold" }}
          >
            {`My Euro winner is: ${winner.team.country}`}
          </Typography>
        ) : (
          <Typography
            variant="h5"
            style={{ margin: "auto", fontWeight: "bold" }}
          >
            {`Click here to choose a team you think will win EURO 2021.`}
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
                      <option key={i} value={e._id}>
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

export default function EuroWinner() {
  const [winner, setWinner] = useState(undefined);

  useEffect(() => {
    getEuroWinner();
  }, []);

  const getEuroWinner = () => {
    api
      .get("/eurowinner", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setWinner(res.data.eurowinner);
        console.log(res.data.eurowinner);
      });
  };

  return (
    <>
      {console.log(winner)}
      <EuroWinnerPaper style={{ margin: "auto" }} winner={winner} />
    </>
  );
}
