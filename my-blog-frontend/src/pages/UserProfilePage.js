import React, { useState, useEffect } from 'react';
import useUser from '../auth/useUser';
import { motion } from 'framer-motion';

const UserProfilePage = () => {
  const user = useUser();

  const userName = user?.name;

  const [profileImagePath, setProfileImagePath] = useState();

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        const result = await fetch('/api/profile-image', {
          method: 'post',
          body: JSON.stringify({ name: userName }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const body = await result.json();
        const { userProfileImage } = body;
        setProfileImagePath(
          'http://localhost:8000/uploads/' + userProfileImage
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticlesData();
  }, [userName]);

  console.log(profileImagePath);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img src={profileImagePath} alt='profile' className='avatar' />
      <h1>{user.name}</h1>
      <h3>{user.email}</h3>
    </motion.div>
  );
};

export default UserProfilePage;
