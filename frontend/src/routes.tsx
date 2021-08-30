import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import List from "./pages/List";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="*" component={List} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
