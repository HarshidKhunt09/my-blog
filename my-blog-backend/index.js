require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/blogRoutes';

const app = express();

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Your server is running on port ${PORT}`);
});
