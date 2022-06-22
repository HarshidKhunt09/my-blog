import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
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
    await fetch('api/signUp', {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div id='signUp-form'>
      <h2>Sign Up</h2>
      <p>
        Already have an account?
        <Link to='/signIn'> Sign in</Link>
      </p>
      <br />
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
