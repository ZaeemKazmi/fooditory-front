import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Login from './user/Login';
import TestPage from './user/TestPage';
import Chat from './user/Chat';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route> 
            <Route exact path="/signup" component={Signup}></Route>    
            <Route exact path="/login" component={Login}></Route>    
            <Route exact path="/testpage" component={TestPage}></Route>
            <Route exact path="/chat" component={Chat}></Route>
        </Switch>
    </div>
);

export default MainRouter;