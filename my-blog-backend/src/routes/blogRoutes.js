import {
  getArticle,
  addUpvotes,
  addComments,
} from '../controllers/blogController';

const routes = (app) => {
  app.route('/api/articles/:name').get(getArticle);

  app.route('/api/articles/:name/upvote').post(addUpvotes);

  app.route('/api/articles/:name/add-comment').post(addComments);
};

export default routes;
