import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useThemeSwitcher from '../hooks/useThemeSwitcher';
import useToken from '../auth/useToken';

const NavBar = () => {
  const [token] = useToken();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const ThemeSwitcher = useThemeSwitcher();

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
            <Link
              to='/add-article'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Add Article
            </Link>
          </li>
          <li>
            <Link
              to='/articles/your-articles'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Your Articles
            </Link>
          </li>
          <li>
            <Link
              to={'/profile'}
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to='/signOut'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Sign Out
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link
              to='/signUp'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to='/signIn'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Sign In
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className='nav'>
      <FontAwesomeIcon
        icon={faBars}
        alt='nav-icon'
        id='nav-icon'
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      />
      <div className={isNavExpanded ? 'expanded' : 'nav'}>
        <ul>
          <li>
            <Link
              to='/'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to='/articles-list'
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              Articles
            </Link>
          </li>
          <RenderMenu />
          {ThemeSwitcher}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
