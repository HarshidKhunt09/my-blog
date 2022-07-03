import React from 'react';
import useUser from '../auth/useUser';
import { motion } from 'framer-motion';

const UserProfilePage = () => {
  const user = useUser();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>{user.name}</h1>
      <h3>{user.email}</h3>
    </motion.div>
  );
};

export default UserProfilePage;
