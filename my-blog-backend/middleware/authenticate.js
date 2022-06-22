import jwt from 'jsonwebtoken';
import { Users } from '../src/controllers/blogController';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    const verifyToken = jwt.verify(token, 'Hello');

    const rootUser = await Users.findOne({ _id: verifyToken._id });

    if (!rootUser) {
      throw new Error('User not Found');
    }

    next();
  } catch (error) {
    res.status(401).send('Unauthorized: No token provided');
  }
};
