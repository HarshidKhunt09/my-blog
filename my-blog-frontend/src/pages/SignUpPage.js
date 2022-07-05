import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { motion } from 'framer-motion';
import useToken from '../auth/useToken';
import usePasswordToggle from '../hooks/usePasswordToggle';

const SignUpPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useToken();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordInputType, passwordToggleIcon] = usePasswordToggle();
  const [confirmPasswordInputType, confirmPasswordToggleIcon] =
    usePasswordToggle();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    const result = await fetch('api/signUp', {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await result.json();
    const { token } = body;
    setToken(token);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    navigate('/');
    dispatch({ type: 'USER', payload: true });
  };

  return (
    <motion.div
      id='signUp-form'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Sign Up</h2>
      <label>
        Name:
        <input
          type='text'
          name='name'
          onChange={onChange}
          value={formData.name}
        />
      </label>
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
      <label>
        Confirm Password:
        <input
          type={confirmPasswordInputType}
          name='confirmPassword'
          onChange={onChange}
          value={formData.confirmPassword}
        />
        <div className='password-toggle-icon'>{confirmPasswordToggleIcon}</div>
      </label>
      <br />
      <button onClick={signUp}>Sign Up</button>
    </motion.div>
  );
};

export default SignUpPage;
