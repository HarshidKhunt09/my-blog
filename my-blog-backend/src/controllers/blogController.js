import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import sendEmail from '../util/sendEmail';
import { v4 as uuid } from 'uuid';
import { ObjectId } from 'mongodb';
import {
  ArticlesInfoSchema,
  BlogSchema,
  SignUpSchema,
} from '../models/blogModel';

export const Articles = mongoose.model('Articles', BlogSchema);
export const Users = mongoose.model('Users', SignUpSchema);
export const ArticlesInfo = mongoose.model('ArticlesInfo', ArticlesInfoSchema);

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

      const verificationString = uuid();

      const newUser = new Users({
        name: name,
        email: email,
        passwordHash: passwordHash,
        confirmPasswordHash: confirmPasswordHash,
        isVerified: false,
        verificationString,
      });

      await newUser.save();

      const { _id } = newUser;

      await sendEmail({
        to: email,
        from: 'harshidkhunt05yt@gmail.com',
        subject: 'Please verify your email',
        text: `
            Thanks for signing up! To verify your email, click here: 
            http://localhost:3000/verify-email/${verificationString}
          `,
      });

      jwt.sign(
        {
          id: _id,
          name,
          email,
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

    const { _id: id, name, passwordHash } = userExist;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, name, email: userExist.email },
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

export const signOut = (req, res) => {
  res.status(200).send({ message: 'signOut successfully' });
};

export const addArticle = async (req, res) => {
  try {
    const { articleName, articleTitle, articleContent } = req.body;

    const articleContentArray = articleContent.split(',');

    const { _id, name, email, isVerified } = req.rootUser;

    if (!isVerified)
      return res.status(403).json({
        message: 'You need to verify your email before you can add article',
      });

    const newArticle = new ArticlesInfo({
      name,
      email,
      articlesDetail: {
        name: articleName,
        title: articleTitle,
        content: articleContentArray,
      },
      creatorId: _id,
    });

    const article = await newArticle.save();
    res.status(201).send(article.articlesDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getArticlesList = async (req, res) => {
  try {
    const articles = await ArticlesInfo.find();

    const articleContent = articles.map((article, key) => {
      return article.articlesDetail;
    });

    res.status(200).send(articleContent);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const saveArticle = async (req, res) => {
  try {
    const articleName = req.params.name;
    const articleInfo = await ArticlesInfo.find({
      'articlesDetail.name': articleName,
    });
    if (articleInfo) {
      const article = await Articles.find({ name: articleName });
      if (article.length === 0) {
        const newArticleData = new Articles({
          name: articleName,
        });
        await newArticleData.save();
        res.status(200).send(newArticleData);
      } else {
        res.status(200).send(article[0]);
      }
    } else {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const yourArticles = async (req, res) => {
  try {
    const articles = await ArticlesInfo.find();

    const yourArticleContent = articles
      .filter((article) => {
        const { name } = req.rootUser;
        if (article.name === name) {
          return true;
        } else {
          return false;
        }
      })
      .map((article) => {
        return article.articlesDetail;
      });

    res.status(200).send(yourArticleContent);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const articleName = req.params.name;
    const articleInfo = await ArticlesInfo.findOne({
      'articlesDetail.name': articleName,
    });
    const article = await Articles.findOne({ name: articleName });
    const deleteArticle = await ArticlesInfo.findByIdAndDelete(articleInfo._id);
    const deleteArticleData = await Articles.findByIdAndDelete(article._id);
    res.send(deleteArticleData);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateArticle = async (req, res) => {
  try {
    const articleName = req.params.name;
    const articleInfo = await ArticlesInfo.findOne({
      'articlesDetail.name': articleName,
    });
    const { name, title, content } = req.body;
    const articleContentArray = content.split(',');

    const updateArticle = await ArticlesInfo.findByIdAndUpdate(
      articleInfo._id,
      {
        $set: { articlesDetail: { name, title, content: articleContentArray } },
      },
      { new: true, useFindAndModify: false }
    );

    let updatedNewArticle = updateArticle.articlesDetail;
    res.send(updatedNewArticle);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationString } = req.body;

  try {
    const userExist = await Users.findOne({ verificationString });

    if (!userExist) return res.status(500).json({ error: 'User not Found' });

    const { _id: id, name, email } = userExist;

    await Users.findByIdAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: { isVerified: true },
      },
      { new: true, useFindAndModify: false }
    );

    jwt.sign(
      {
        id,
        name,
        email,
        isVerified: true,
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
  } catch (error) {
    res.status(500).send(error);
  }
};
