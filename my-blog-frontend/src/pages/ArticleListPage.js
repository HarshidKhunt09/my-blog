import React from 'react';
import ArticleList from '../components/ArticleList';
import articleContent from './article-content';

const ArticleListPage = () => {
  return (
    <div id='articles-body'>
      <h1>Articles</h1>
      <input type='text' />
      <ArticleList articles={articleContent} />
    </div>
  );
};

export default ArticleListPage;
