import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/blogRoutes';

const app = express();
const PORT = 8000;

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/my-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection is successful');
  })
  .catch((e) => {
    console.log('No Connection');
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
