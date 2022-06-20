import React from 'react';
import ArticleList from '../components/ArticleList';
import articleContent from './article-content';

const ArticleListPage = () => {
  return (
    <>
      <h1>Articles</h1>
      <ArticleList articles={articleContent} />
    </>
  );
};

export default ArticleListPage;
