import React from "react";

const LoginContext = React.createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
});

export default LoginContext;
