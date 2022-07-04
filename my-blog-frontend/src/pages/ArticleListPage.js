import React, { useState } from 'react';
import ArticleList from '../components/ArticleList';
import { motion } from 'framer-motion';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const ArticleListPage = ({ articleList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [orderBy, setOrderBy] = useState('normal');

  const FilteredArticleList = articleList
    ?.filter((article) => {
      return article?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      // || article.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .sort((a, b) => {
      if (orderBy === 'asc' || orderBy === 'des') {
        const order = orderBy === 'asc' ? 1 : -1;
        return a[sortBy]?.toLowerCase() < b[sortBy]?.toLowerCase()
          ? -1 * order
          : 1 * order;
      }
      return articleList;
    });

  return (
    <motion.div
      id='articles-body'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
      <ScrollToTop />
    </motion.div>
  );
};

export default ArticleListPage;
