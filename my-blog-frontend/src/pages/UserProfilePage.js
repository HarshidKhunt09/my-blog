import React from 'react';
import useUser from '../auth/useUser';

const UserProfilePage = () => {
  const user = useUser();

  return (
    <>
      <h1>{user.name}</h1>
      <h3>{user.email}</h3>
    </>
  );
};

export default UserProfilePage;
