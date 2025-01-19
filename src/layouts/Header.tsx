import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <Link to="/">Logo</Link>
          <div className="buttons">{/* Buttons */}</div>
        </div>
      </div>
    </header>
  );
};
