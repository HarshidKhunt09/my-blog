import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationFail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Uh oh...</h1>
      <p>Something went wrong while trying to verify your email.</p>
      <button onClick={() => navigate('/signUp')}>Back to Sign Up Page</button>
    </div>
  );
};

export default EmailVerificationFail;
