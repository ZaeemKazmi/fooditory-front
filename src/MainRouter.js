import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Login from './user/Login';
import TestPage from './user/TestPage';
import Chat from './user/Chat';
import OfferFood from "./core/OfferFood";
import UserProfileTemplate from "./core/UserProfileTemplate";
import OffersAndReviewsView from './core/OffersAndReviewsView';
import SubmitRatingView from './core/SubmitRatingView';
import Offers from "./core/Offers";
import Browse from "./core/Browse";

const axios = require('axios');

(function() {
  let jwt = JSON.parse(localStorage.getItem('jwt'));

  if (jwt) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt.token;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }
})();

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/testpage" component={TestPage} />
      <Route exact path="/offerFood" component={OfferFood} />
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/offers" component={Offers} />
      <Route exact path="/browse" component={Browse} />

      <Route exact path="/users/:user_id" render={(props) => 
        <UserProfileTemplate {...props} contentComponent={OffersAndReviewsView} />
      } />
      <Route exact path="/users/:user_id/review" render={(props) => 
        <UserProfileTemplate {...props} contentComponent={SubmitRatingView} />
      } />
    </Switch>
  </div>
);

export default MainRouter;