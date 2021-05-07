import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";
import LoginContext from "../contexts/LoginContext";
import RepositoryList from "./RepositoryList";
import RepositoryDetails from "./RepositoryDetails";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.main,
  },
});

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const login = () => {
    setLoggedIn(true);
  };
  const logout = () => {
    setLoggedIn(false);
  };
  return (
    <View style={styles.container}>
      <LoginContext.Provider
        value={{
          isLoggedIn: loggedIn,
          token: null,
          login,
          logout,
        }}
      >
        <AppBar />
        <Switch>
          <Route path="/repositories" exact>
            <RepositoryList />
          </Route>
          <Route path="/repositories/:id" exact>
            <RepositoryDetails />
          </Route>
          <Route path="/" exact>
            <SignIn />
          </Route>
          <Redirect to="/" />
        </Switch>
      </LoginContext.Provider>
    </View>
  );
};

export default Main;
