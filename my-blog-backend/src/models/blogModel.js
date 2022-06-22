import jwt from 'jsonwebtoken';
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
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
});

SignUpSchema.methods.generateAuthToken = function () {
  try {
    let token = jwt.sign({ _id: this._id }, 'Hello');
    return token;
  } catch (error) {
    console.log(error);
  }
};
