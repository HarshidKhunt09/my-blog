import jwt from 'jsonwebtoken';
import { Users } from '../src/controllers/blogController';

export const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split('Bearer ')[1];

    const verifyToken = jwt.verify(token, 'Hello');

    const rootUser = await Users.findOne({ _id: verifyToken.id });

    req.rootUser = rootUser;

    next();
  } catch (error) {
    console.log({ error });
    res.status(401).json({ message: 'Unable to verify token' });
  }
};
