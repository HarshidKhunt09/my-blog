import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import useToken from '../auth/useToken';

const SignInPage = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useToken();
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    const result = await fetch('api/signIn', {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await result.json();
    const { token } = body;
    setToken(token);
    dispatch({ type: 'USER', payload: true });
    setFormData({ email: '', password: '' });
    navigate('/');
  };

  return (
    <div id='signIn-form'>
      <h2>Sign In</h2>
      <label>
        Email:
        <input
          type='text'
          name='email'
          onChange={onChange}
          value={formData.email}
        />
      </label>
      <label>
        Password:
        <input
          type='text'
          name='password'
          onChange={onChange}
          value={formData.password}
        />
      </label>
      <br />
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};

export default SignInPage;
