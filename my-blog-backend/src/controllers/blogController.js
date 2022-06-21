import mongoose from 'mongoose';
import { BlogSchema } from '../models/blogModel';

export const Articles = mongoose.model('Articles', BlogSchema);

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
