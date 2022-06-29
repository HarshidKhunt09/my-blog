import React, { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';

const ArticleListPage = () => {
  const [articleList, setArticleList] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [orderBy, setOrderBy] = useState('normal');

  useEffect(() => {
    const fetchArticlesData = async () => {
      const result = await fetch('/api/articles-list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const body = await result.json();
      setArticleList(body);
    };
    fetchArticlesData();
  }, [setArticleList]);

  const FilteredArticleList = articleList
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
      return articleList;
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
