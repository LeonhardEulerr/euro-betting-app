import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./utils/ProtectedRoute";
import AddMatches from "./components/AddMatchesPage";
import Profile from "./components/ProfilePage";
import Main from "./components/Main";
import AddTeam from "./components/AddTeam";
import RegisterPage from "./components/RegisterPage";
import Matches from "./components/Matches";
import MyMatches from "./components/MyMatches";
import Ranking from "./components/Ranking";
import { UserContext } from "./Contexts/userContext";
import { api } from "./utils/api";
import EuroWinner from "./components/EuroWinner";
import RealEuroWinner from "./components/RealEuroWinner";

const App = () => {
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      async function fetchData() {
        validate().then((user) => {
          if (isMounted) setUsername(user);
        });
      }
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const validate = async () => {
    return api
      .get("/username", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        return res.data.user;
      })
      .catch((_err) => {
        return undefined;
      });
  };

  return (
    <UserContext.Provider value={{ username }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute exact path="/register">
            <RegisterPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/addmatches">
            <AddMatches />
          </ProtectedRoute>
          <ProtectedRoute exact path="/matches">
            <Matches />
          </ProtectedRoute>
          <ProtectedRoute exact path="/addteam">
            <AddTeam />
          </ProtectedRoute>
          <ProtectedRoute exact path="/mymatches">
            <MyMatches />
          </ProtectedRoute>
          <ProtectedRoute exact path="/ranking">
            <Ranking />
          </ProtectedRoute>
          <ProtectedRoute exact path="/eurowinner">
            <EuroWinner />
          </ProtectedRoute>
          <ProtectedRoute exact path="/realeurowinner">
            <RealEuroWinner />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
