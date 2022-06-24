import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li>
            <Link to='/signOut' onClick={signOut}>
              Sign Out
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to='/signUp'>Sign Up</Link>
          </li>
          <li>
            <Link to='/signIn'>Sign In</Link>
          </li>
        </>
      );
    }
  };

  const signOut = () => {
    return localStorage.removeItem('token');
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
        <RenderMenu />
      </ul>
    </nav>
  );
};

export default NavBar;
