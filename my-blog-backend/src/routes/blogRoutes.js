import {
  getArticle,
  addUpvotes,
  addComments,
  signUp,
  signIn,
  about,
} from '../controllers/blogController';
import { authenticate } from '../../middleware/authenticate';

const routes = (app) => {
  app.route('/api/signUp').post(signUp);

  app.route('/api/signIn').post(signIn);

  app.route('/api/articles/:name').get(authenticate, getArticle);

  app.route('/api/articles/:name/upvote').post(addUpvotes);

  app.route('/api/articles/:name/add-comment').post(addComments);
};

export default routes;
