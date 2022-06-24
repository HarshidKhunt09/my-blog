import useUser from './useUser';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useUser();
  return isAuthenticated ? children : <Navigate to='/signIn' />;
};

export default PrivateRoute;
