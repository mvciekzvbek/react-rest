import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from './react-auth0-spa';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/profile/Profile';
import Header from './components/shared/Header';
import HomePage from './components/home/HomePage';
import CategoriesList from './components/category/CategoriesList';
import ArticlesList from './components/articles/ArticlesList';
import ManageArticle from './components/articles/ManageArticle';
import PageNotFound from './components/PageNotFound';
import client from './utils/client';
import { clearSnackbar } from './redux/actions/snackbarActions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState('');
  const { getTokenSilently, loading } = useAuth0();
  const dispatch = useDispatch();
  const {
    successSnackbarMessage,
    successSnackbarOpen,
    failureSnackbarMessage,
    failureSnackbarOpen
  } = useSelector(
    (state) => state.ui,
  );

  if (loading) {
    return 'Loading...';
  }

  const getAccessToken = async () => {
    // getTokenSilently() returns a promise
    try {
      const token = await getTokenSilently();
      setAccessToken(token);
      client.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }, (err) => {
        console.log(err);
      });
    } catch (e) {
      console.log(e);
    }
  };
  getAccessToken();

  const handleSnackbarClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <div className="App">
      <Header />
      <Switch>
        {isAuthenticated ? (
          <PrivateRoute exact path="/" component={ArticlesList} />
        ) : (
          <Route exact path="/" component={HomePage} />
        )}
        <PrivateRoute component={ArticlesList} path="/(latest|articles)" />
        <PrivateRoute component={CategoriesList} exact path="/categories" />
        <PrivateRoute component={ManageArticle} exact path="/create" />
        <PrivateRoute component={ManageArticle} exact path="/articles/:id/edit" />
        <PrivateRoute component={Profile} exact path="/users/:nickname" />
        <PrivateRoute component={ArticlesList} exact path="/users/:nickname/articles" />
        <Route component={PageNotFound} />
      </Switch>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        aria-describedby="client-snackbar"
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {successSnackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={failureSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        aria-describedby="client-snackbar"
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {failureSnackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
