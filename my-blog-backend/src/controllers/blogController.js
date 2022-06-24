import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { BlogSchema } from '../models/blogModel';
import { SignUpSchema } from '../models/blogModel';

export const Articles = mongoose.model('Articles', BlogSchema);
export const Users = mongoose.model('Users', SignUpSchema);

export const getArticle = async (req, res) => {
  try {
    const articleName = req.params.name;
    const articleInfo = await Articles.findOne({ name: articleName });
    res.status(200).send(articleInfo);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addUpvotes = async (req, res) => {
  try {
    const articleName = req.params.name;
    const articleInfo = await Articles.findOne({ name: articleName });
    const addUpvote = await Articles.findOneAndUpdate(
      { name: articleName },
      {
        $set: {
          upvotes: articleInfo.upvotes + 1,
        },
      }
    );
    const updatedArticleInfo = await Articles.findOne({ name: articleName });
    res.status(200).send(updatedArticleInfo);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addComments = async (req, res) => {
  try {
    const { username, text } = req.body;
    const articleName = req.params.name;

    const addComment = await Articles.findOneAndUpdate(
      { name: articleName },
      {
        $push: {
          comments: [{ username, text }],
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send(addComment);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const userExist = await Users.findOne({ email: email });

    if (!name || !email || !password || !confirmPassword) {
      return res.status(422).json({ error: 'Plz filled the field properly' });
    } else if (userExist) {
      return res.status(422).json({ error: 'Email already Exist' });
    } else if (password != confirmPassword) {
      return res.status(422).json({ error: 'Password are not matching' });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const confirmPasswordHash = await bcrypt.hash(confirmPassword, 10);

      const newUser = new Users({
        name: name,
        email: email,
        passwordHash: passwordHash,
        confirmPasswordHash: confirmPasswordHash,
        isVerified: false,
      });

      await newUser.save();

      const { _id } = newUser;

      jwt.sign(
        {
          id: _id,
          email: email,
          isVerified: false,
        },
        'Hello',
        {
          expiresIn: '2d',
        },
        (error, token) => {
          if (error) {
            return res.status(500).send(error);
          }
          res.status(200).json({ token });
        }
      );
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Plz filled the data' });
    }

    const userExist = await Users.findOne({ email: email });

    if (!userExist) return res.status(500).json({ error: 'User not Found' });

    const { _id: id, passwordHash, isVerified } = userExist;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, email, isVerified },
        'Hello',
        {
          expiresIn: '2d',
        },
        (error, token) => {
          if (error) {
            return res.status(500).send(error);
          }
          res.status(200).json({ token });
        }
      );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
