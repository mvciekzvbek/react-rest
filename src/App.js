import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from './react-auth0-spa';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/profile/Profile';
import Header from './components/shared/Header';
import HomePage from './components/home/HomePage';
import CategoriesList from './components/category/CategoriesList';
import ArticlesList from "./components/article/ArticlesList";
import PageNotFound from "./components/PageNotFound";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState('');
  const { getTokenSilently, loading } = useAuth0();

  if (loading) {
    return 'Loading...';
  }

  const getAccessToken = async () => {
    // getTokenSilently() returns a promise
    try {
      const token = await getTokenSilently();
      setAccessToken(token);
    } catch (e) {
      console.log(e);
    }
  };
  getAccessToken();

  return (
    <div className="App">
      <Header />
      <Switch>
        {isAuthenticated ? (
          <PrivateRoute exact path="/" component={ArticlesList} />
        ) : (
          <Route exact path="/" component={HomePage} />
        )}
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/latest" component={ArticlesList} />
        <PrivateRoute component={CategoriesList} exact path="/categories" />
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
