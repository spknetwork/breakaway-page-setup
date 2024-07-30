import React from 'react';
import { Link } from 'react-router-dom';
import "./not-found.scss"

const NotFound = () => {
  return (
    <div className='not-found'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link className='not-found-link' to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
