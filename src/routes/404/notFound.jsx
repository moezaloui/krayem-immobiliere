import React from 'react';
import './notFound.scss';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const Navigate = useNavigate();

  const handleGoBack = () => {
    Navigate('/');
  };

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__message">
        Oops! The page you are looking for does not exist.
      </p>
      <button className="not-found__button" onClick={handleGoBack}>
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;
