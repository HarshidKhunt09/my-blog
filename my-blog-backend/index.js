require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/blogRoutes';
import multer from 'multer';
import path from 'path';

const app = express();

app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection is successful');
  })
  .catch((e) => {
    console.log('No Connection', e);
  });

var Storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + file.originalname);
  },
});

export var upload = multer({
  storage: Storage,
}).single('profileImage');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Your server is running ...`);
});
