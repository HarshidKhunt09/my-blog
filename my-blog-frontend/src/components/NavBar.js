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
            <Link to='/add-article'>Add Article</Link>
          </li>
          <li>
            <Link to='/articles/your-articles'>Your Articles</Link>
          </li>
          <li>
            <Link to={'/profile'}>Profile</Link>
          </li>
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
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/articles-list'>Articles</Link>
          </li>
          <RenderMenu />
          {ThemeSwitcher}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
