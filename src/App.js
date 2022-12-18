import Users from "./layouts/users";
import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
// import UserPage from "./components/userPage";

function App () {
  return (
    <>
    <NavBar/>
    <Switch>
    <Route path="/login" component={Login} />
    <Route path="/users/:userId" component={Users} />
    <Route path="/users" component={Users} />
    <Route path="/" component={Main} />
    </Switch>
    </>);
};

export default App;
