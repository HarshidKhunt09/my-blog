import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmailVerificationSuccess from './EmailVerificationSuccess';
import EmailVerificationFail from './EmailVerificationFail';
import useToken from '../auth/useToken';

const EmailVerificationLandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();
  const [, setToken] = useToken();

  useEffect(() => {
    setIsLoading(true);
    const loadVerification = async () => {
      try {
        const result = await fetch('/api/verify-email', {
          method: 'put',
          body: JSON.stringify({ verificationString }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const body = await result.json();
        const { token } = body;
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadVerification();
  }, []);

  if (isLoading)
    return (
      <h1 style={{ marginTop: '100px', marginLeft: '200px' }}>Loading...</h1>
    );
  if (!isSuccess) return <EmailVerificationFail />;

  return <EmailVerificationSuccess />;
};

export default EmailVerificationLandingPage;
