import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Login from "./user/Login";
import TestPage from "./user/TestPage";
import Chat from "./user/Chat";
import OfferFood from "./core/OfferFood";
import Offers from "./core/Offers";
import Browse from "./core/Browse";
import UserItem from "./core/UserItem";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/testpage" component={TestPage} />
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/offerFood" component={OfferFood} />
      <Route exact path="/offers" component={Offers} />
      <Route exact path="/browse" component={Browse} />
      <Route exact path="/userItem" component={UserItem} />
    </Switch>
  </div>
);

export default MainRouter;
