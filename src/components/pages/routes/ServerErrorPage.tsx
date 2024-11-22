import React from 'react';
import { Link } from 'react-router-dom';

const ServerErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops! Something went wrong...</h1>
      <h2>Server not responding. Contact the admin.</h2>
      <Link to="/">Go back to the login page</Link>
    </div>
  );
};

export default ServerErrorPage;