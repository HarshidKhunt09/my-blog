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
  verifyEmail,
  getProfileImage,
} from '../controllers/blogController';
import { authenticate } from '../../middleware/authenticate';
import { upload } from '../../index';

const routes = (app) => {
  app.route('/api/signUp').post(upload, signUp);

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

  app.route('/api/verify-email').put(verifyEmail);

  app.route('/api/profile-image').post(getProfileImage);
};

export default routes;
