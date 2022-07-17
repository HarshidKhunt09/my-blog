import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../auth/useToken';
import usePasswordToggle from '../hooks/usePasswordToggle';
import useButtonLoader from '../hooks/useButtonLoader';

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
  const [file, setFile] = useState();
  const [signUpButtonElement, setSignUpLoading] = useButtonLoader(
    'Sign Up',
    'Sign Up ...'
  );
  const [passwordInputType, passwordToggleIcon] = usePasswordToggle();
  const [confirmPasswordInputType, confirmPasswordToggleIcon] =
    usePasswordToggle();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    setSignUpLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);
    data.append('profileImage', file);
    const result = await fetch('api/signUp', {
      method: 'post',
      body: data,
    });
    const body = await result.json();
    const { token } = body;
    setToken(token);
    setSignUpLoading(false);
    toast.success('Sign Up Successfully', {
      autoClose: 4000,
      theme: 'dark',
    });
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setTimeout(() => {
      navigate('/please-verify');
    }, 3000);
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
      <label>
        Confirm Password:
        <input
          type='file'
          name='profileImage'
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      <br />
      <button onClick={signUp} ref={signUpButtonElement}>
        Sign Up
      </button>
      <ToastContainer />
    </motion.div>
  );
};

export default SignUpPage;
