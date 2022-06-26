import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BlogSchema = new Schema({
  name: {
    type: String,
  },
  upvotes: {
    type: Number,
  },
  comments: [
    {
      username: { type: String },
      text: { type: String },
    },
  ],
});

export const SignUpSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  confirmPasswordHash: {
    type: String,
  },
});

export const ArticlesInfoSchema = new Schema({
  _id: {
    type: ObjectId,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  articleName: {
    type: String,
  },
  articleTitle: {
    type: String,
  },
  articleContent: {
    type: Array,
  },
});
