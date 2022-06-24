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
  isVerified: {
    type: Boolean,
    default: false,
  },
});
