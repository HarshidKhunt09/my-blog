import bcrypt from 'bcrypt';
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
    let newUser = new Users(req.body);

    if (newUser.password != newUser.confirmPassword) {
      return res.status(422).json({ error: 'Password are not matching' });
    } else {
      newUser.password = await bcrypt.hash(newUser.password, 12);
      newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, 12);

      const User = await newUser.save();
      res.status(201).send(User);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const signIn = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please filled the data' });
    }

    const User = await Users.findOne({ email: email });

    if (User) {
      const isMatch = await bcrypt.compare(password, User.password);

      token = await User.generateAuthToken();
      console.log(token);

      res.cookie('jwtToken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: 'Invalid Credentials' });
      } else {
        res.json({ message: 'user signIn successfully ' });
      }
    } else {
      res.status(400).json({ error: 'Invalid Credential' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
