import React, { useState } from 'react';
import ArticleList from '../components/ArticleList';
import articleContent from './article-content';

const ArticleListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const FilteredArticleList = articleContent.filter((article) => {
    return article.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div id='articles-body'>
      <h1>Articles</h1>
      <input
        type='text'
        placeholder='Search Articles'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <button>Ascending</button>
      <button>Descending</button>
      <ArticleList
        articles={searchTerm < 1 ? articleContent : FilteredArticleList}
      />
    </div>
  );
};

export default ArticleListPage;
