import React, { useState } from 'react';
import ArticleList from '../components/ArticleList';
import articleContent from './article-content';

const ArticleListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [orderBy, setOrderBy] = useState('normal');

  const FilteredArticleList = articleContent
    .filter((article) => {
      return article.title.toLowerCase().includes(searchTerm.toLowerCase());
      // || article.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .sort((a, b) => {
      if (orderBy === 'asc' || orderBy === 'des') {
        const order = orderBy === 'asc' ? 1 : -1;
        return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
          ? -1 * order
          : 1 * order;
      }
      return articleContent;
    });

  return (
    <div id='articles-body'>
      <h1>Articles</h1>
      <input
        type='text'
        placeholder='Search Articles'
        value={searchTerm || ''}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='sortBy'>
        Sort By: <button onClick={() => setSortBy('title')}>Title</button>
        <button onClick={() => setSortBy('name')}>Name</button>
      </div>
      <div className='orderBy'>
        Order By: <button onClick={() => setOrderBy('asc')}>Ascending</button>
        <button onClick={() => setOrderBy('des')}>Descending</button>
        <button onClick={() => setOrderBy('normal')}>Normal</button>
      </div>
      <ArticleList articles={FilteredArticleList} />
    </div>
  );
};

export default ArticleListPage;
