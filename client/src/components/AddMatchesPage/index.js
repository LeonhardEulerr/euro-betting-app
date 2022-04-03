import {
  Button,
  Select,
  TextField,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { api } from "../../utils/api";

export default function AddMatches() {
  // The first commit of Material-UI

  const [teams, setTeams] = useState([]);
  const [home, setHome] = useState({});
  const [away, setAway] = useState({});
  const [group, setGroup] = useState("");
  const [date, setDate] = useState({});

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

  const handleHomeChange = (event) => {
    setHome(event.target.value);
  };

  const handleAwayChange = (event) => {
    setAway(event.target.value);
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const addMatch = () => {
    api
      .post(
        "/matches",
        {
          date: date,
          homeId: home,
          awayId: away,
          group: group,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // add this match to all the users in database
        const matchId = res.data.id;
        api
          .get("/users", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            res.data.users.map((e) => {
              return api
                .post(
                  "/usermatches",
                  { id: matchId, user: e.login },
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
            setGroup("");
            setHome("");
            setAway("");
          });
        console.log(res.data.message);
      })
      .catch((_err) => {
        console.log("error while adding a match");
      });
  };

  return (
    <>
      <TextField
        variant="outlined"
        label="Group"
        value={group}
        onChange={handleGroupChange}
      />
      <FormControl>
        <InputLabel>Home</InputLabel>
        {teams ? (
          <Select
            native
            value={home.country}
            onChange={handleHomeChange}
            inputProps={{
              name: "Home",
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
      <FormControl>
        <InputLabel>Away</InputLabel>
        {teams ? (
          <Select
            native
            value={away.country}
            onChange={handleAwayChange}
            inputProps={{
              name: "Away",
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
      <TextField
        id="datetime-local"
        label="Date"
        type="datetime-local"
        defaultValue="2020-06-10T10:30"
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onInput={(e) => setDate(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addMatch}>
        Add match
      </Button>
    </>
  );
}
