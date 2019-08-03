import React, { Component } from 'react';
import './App.css';
// import Users from './Users';
// import User from './User';
// import Article from './Article';
// import Categories from './Categories';
// import Category from './Category';
// import PostArticle from './postArticle'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import ArticlesList from './ArticlesList';
import Navigation from './Navigation';


const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '32px',
  },
}));


const App = props => (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <Route component={ArticlesList} exact path="/" />
      {/* <Route component={PostArticle} path="/new"/>
            <Route component={Article} path="/articles/:id"  />
            <Route component={Users} exact path="/users" />
            <Route component={User} path="/users/:id" />
            <Route component={Categories} exact path="/categories" />
            <Route component={Category} path="/categories/:id" />
            <Route component={({ location }) => <h1>"{location.pathname}" not found</h1>} /> */}
    </Switch>
  </BrowserRouter>
);

export default App;
