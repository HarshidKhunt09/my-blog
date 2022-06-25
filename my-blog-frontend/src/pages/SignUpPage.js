import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import useToken from '../auth/useToken';

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
    dispatch({ type: 'USER', payload: false });
  };

  return (
    <div id='signUp-form'>
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
          type='text'
          name='password'
          onChange={onChange}
          value={formData.password}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type='text'
          name='confirmPassword'
          onChange={onChange}
          value={formData.confirmPassword}
        />
      </label>
      <br />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
};

export default SignUpPage;
