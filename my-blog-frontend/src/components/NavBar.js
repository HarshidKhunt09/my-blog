import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const signOut = () => {
    localStorage.removeItem('token');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/articles-list'>Articles</Link>
        </li>
        <li>
          <Link to='/signIn'>Sign In</Link>
        </li>
        <li>
          <Link to='/signUp'>Sign Up</Link>
        </li>
        <li>
          <Link to='/signUp' onClick={signOut}>
            Sign Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
