import { useState, useEffect } from 'react';
import useToken from './useToken';
import jwt_decode from 'jwt-decode';

const useUser = () => {
  const [token] = useToken();

  const getPayloadFromToken = (token) => {
    var decoded = jwt_decode(token);
    return decoded;
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  return user;
};

export default useUser;
