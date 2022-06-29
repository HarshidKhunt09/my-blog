import React from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../icons/delete.png';

const YourArticleList = ({ articles }) => {
  return (
    <>
      {articles.map((article, key) => {
        return (
          <div className='article-list-item'>
            <div id='article-list'>
              <Link key={key} to={`/article/${article.name}`}>
                <h3>{article.title}</h3>
              </Link>
              <img
                id='delete-icon'
                src={deleteIcon}
                alt='delete-icon'
                height='25px'
              />
            </div>
            <Link key={key} to={`/article/${article.name}`}>
              <h6>Name: {article.name}</h6>
              <p>{article.content[0].substring(0, 150)}...</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default YourArticleList;
