import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../App';
import { motion } from 'framer-motion';
import useToken from '../auth/useToken';
import usePasswordToggle from '../hooks/usePasswordToggle';

const SignInPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useToken();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordInputType, passwordToggleIcon] = usePasswordToggle();

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
    setFormData({ email: '', password: '' });
    dispatch({ type: 'USER', payload: true });
    navigate('/');
  };

  return (
    <motion.div
      id='signIn-form'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Sign In</h2>
      <p>
        Don't have an account?
        <Link to='/signUp'> Sign Up</Link>
      </p>
      <br />
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
          type={passwordInputType}
          name='password'
          onChange={onChange}
          value={formData.password}
        />
        <div className='password-toggle-icon'>{passwordToggleIcon}</div>
      </label>
      <br />
      <button onClick={signIn}>Sign In</button>
    </motion.div>
  );
};

export default SignInPage;
