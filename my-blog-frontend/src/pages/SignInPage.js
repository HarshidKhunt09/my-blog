import React, { useState } from 'react';

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    await fetch('api/signIn', {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setFormData({ email: '', password: '' });
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
