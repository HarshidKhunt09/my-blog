import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BlogSchema = new Schema({
  name: {
    type: String,
  },
  upvotes: {
    type: Number,
    default: 0,
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
  isVerified: {
    type: Boolean,
  },
  verificationString: {
    type: String,
  },
});

export const ArticlesInfoSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  articlesDetail: {
    name: { type: String },
    title: { type: String },
    content: { type: Array },
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'SignUpSchema',
  },
});
