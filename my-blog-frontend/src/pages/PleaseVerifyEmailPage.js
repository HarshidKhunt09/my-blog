import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import React from 'react';

const PleaseVerifyEmailPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, [4000]);
  }, [navigate]);

  return (
    <div>
      <h1>Thanks for Signing Up!</h1>
      <p>Please verify your email to unlock full site features.</p>
    </div>
  );
};

export default PleaseVerifyEmailPage;
