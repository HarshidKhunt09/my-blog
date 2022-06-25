import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import useToken from '../auth/useToken';

const NavBar = () => {
  const [token] = useToken();

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      dispatch({ type: 'USER', payload: true });
    } else {
      dispatch({ type: 'USER', payload: false });
    }
  }, [dispatch, token]);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li>
            <Link to='/signOut'>Sign Out</Link>
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
