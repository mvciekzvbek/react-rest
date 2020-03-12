import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';

const HomePage = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <p>Welcome</p>
    </>
  );
};

export default HomePage;
