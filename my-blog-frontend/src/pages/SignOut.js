import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const SignOut = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/signOut`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      localStorage.removeItem('token');
      dispatch({ type: 'USER', payload: false });
      navigate('/signIn');
    };
    fetchData();
  });

  return (
    <>
      <h3>SignOut SuccessFully</h3>
    </>
  );
};

export default SignOut;
