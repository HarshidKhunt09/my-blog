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
