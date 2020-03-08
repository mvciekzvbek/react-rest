import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from './react-auth0-spa';
import PrivateRoute from './components/PrivateRoute';
import Profile from './views/Profile';
import NavBar from './components/nav/NavBar';
import HomePage from './views/HomePage';
import CategoriesList from './views/Category/CategoriesList';
import ArticlesList from "./views/Article/ArticlesList";

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
      <header>
        <NavBar />
      </header>
      <Switch>
        {isAuthenticated ? (
          <PrivateRoute path="/" exact component={ArticlesList} />
        ) : (
          <Route path="/" exact component={HomePage} />
        )}
        <PrivateRoute path="/profile" component={Profile} />
        {/*<PrivateRoute component={Users} exact path="/users" />*/}
        {/*<PrivateRoute component={User} path="/users/:id" />*/}
        <Route path="/latest" component={ArticlesList} />
        <PrivateRoute component={CategoriesList} exact path="/categories" />
        {/*<PrivateRoute component={Category} path="/categories/:id" />*/}
        {/*<PrivateRoute component={({ location }) => <h1>"{location.pathname}" not found</h1>} />*/}
      </Switch>
    </div>
  );
}

export default App;
