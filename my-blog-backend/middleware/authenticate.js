import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];

    jwt.verify(token, 'Hello');

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unable to verify token' });
  }
};
