import React, { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/signOut`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (result.status === 200) {
        dispatch({ type: 'USER', payload: false });
        navigate('/signIn');
      } else {
        const error = new Error(result.error);
        throw error;
      }
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
