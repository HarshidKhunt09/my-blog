import {
  getArticle,
  addUpvotes,
  addComments,
  signUp,
  signIn,
  signOut,
  addArticle,
  getArticlesList,
  saveArticle,
  yourArticles,
  deleteArticle,
  updateArticle,
} from '../controllers/blogController';
import { authenticate } from '../../middleware/authenticate';

const routes = (app) => {
  app.route('/api/signUp').post(signUp);

  app.route('/api/signIn').post(signIn);

  app.route('/api/signOut').get(signOut);

  app.route('/api/articles/add-article').post(authenticate, addArticle);

  app.route('/api/articles/your-articles').get(authenticate, yourArticles);

  app
    .route('/api/articles/:name')
    .get(authenticate, getArticle)
    .post(authenticate, saveArticle)
    .delete(authenticate, deleteArticle)
    .put(authenticate, updateArticle);

  app.route('/api/articles/:name/upvote').post(addUpvotes);

  app.route('/api/articles/:name/add-comment').post(addComments);

  app.route('/api/articles-list').get(getArticlesList);
};

export default routes;
