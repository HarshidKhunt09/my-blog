import React from 'react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>404: Page Not Found</h1>
    </motion.div>
  );
};

export default NotFoundPage;
