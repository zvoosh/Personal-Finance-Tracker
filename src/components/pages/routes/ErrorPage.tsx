import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops! Something went wrong...</h1>
      <p>We can't find the page you're looking for.</p>
      <Link to="/">Go back to the login page</Link>
    </div>
  );
};

export default ErrorPage;