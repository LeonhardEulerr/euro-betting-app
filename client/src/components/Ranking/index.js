import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//import TableRowColumn from "@material-ui/core/TableRowColumn";
import Paper from "@material-ui/core/Paper";

import { api } from "../../utils/api";
import { CircularProgress } from "@material-ui/core";

export default function Ranking() {
  const CORRECT_RESULT = 1;
  const CORRECT_GOALS = 3;
  const CORRECT_WINNER = 20;

  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    if (isMounted) {
      async function fetchData() {
        await fetchRanking();
      }
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const addEuroWinnerScore = async () => {
    return await api
      .get("/realeurowinner", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.winner) {
          return api
            .get("/eurowinner", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res2) => {
              console.log("res", res.data.winner.country);
              console.log("res2", res2.data.eurowinner.team.country);
              if (res2.data.eurowinner) {
                if (
                  res.data.winner.country === res2.data.eurowinner.team.country
                ) {
                  return CORRECT_WINNER;
                } else {
                  return 0;
                }
              } else {
                return 0;
              }
            });
        } else {
          return 0;
        }
      });
  };

  const getPointsForMatchResult = (realResult, myResult) => {
    if (realResult === "1" && (myResult === "10" || myResult === "12")) {
      return CORRECT_RESULT;
    } else if (realResult === "0" && (myResult === "10" || myResult === "02")) {
      return CORRECT_RESULT;
    } else if (realResult === "2" && (myResult === "02" || myResult === "12")) {
      return CORRECT_RESULT;
    } else if (realResult === myResult) {
      return 2;
    } else {
      return 0;
    }
  };

  const addScore = (matches) => {
    let res = 0;
    matches.map((e) => {
      if (
        "result" in e.match &&
        "result" in e &&
        e.match.homeGoals !== null &&
        e.match.awayGoals !== null &&
        e.homeGoals !== null &&
        e.awayGoals !== null
      ) {
        if (
          e.match.homeGoals === e.homeGoals &&
          e.match.awayGoals === e.awayGoals
        ) {
          res += CORRECT_GOALS;
        }
        res += getPointsForMatchResult(e.match.result, e.result);
      }
    });
    return res;
  };

  const getFullScore = async (login) => {
    return await api
      .get(`/usermatchesranking/${login}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (res) => {
        let score = addScore(res.data.matches);
        const score2 = await addEuroWinnerScore();
        score += score2;
        return { [login]: score };
      });
  };

  const fetchRanking = async () => {
    let newArr = [];
    await api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (res) => {
        for (const user of res.data.users) {
          let currScore = await getFullScore(user.login);
          newArr.push(currScore);
        }
        newArr.sort((a, b) => {
          const a_key = Object.keys(a);
          const a_value = a[a_key];
          const b_key = Object.keys(b);
          const b_value = b[b_key];

          if (a_value == b_value) return 0;
          return a_value < b_value ? 1 : -1;
        });
        setRanking(newArr);
        setLoading(false);
      });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ width: "650px", margin: "auto" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                Player
              </TableCell>
              <TableCell
                align="right"
                style={{ fontSize: "1.5em", fontWeight: "bold" }}
              >
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} style={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {ranking.map((r, i) =>
                i === 0 ? (
                  <TableRow key={Object.keys(r)[0]}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontWeight: "bold", color: "#00CC00" }}
                    >
                      {Object.keys(r)[0]}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: "bold", color: "#00CC00" }}
                    >
                      {r[Object.keys(r)[0]]}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={Object.keys(r)[0]}>
                    <TableCell component="th" scope="row">
                      {Object.keys(r)[0]}
                    </TableCell>
                    <TableCell align="right">{r[Object.keys(r)[0]]}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
