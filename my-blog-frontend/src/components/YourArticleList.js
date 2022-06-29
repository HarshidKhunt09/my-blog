import React from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../icons/delete.png';

const YourArticleList = ({ articles }) => {
  const deleteArticle = async (name) => {
    try {
      await fetch(`/api/articles/${name}`, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {articles.map((article, key) => {
        return (
          <div className='article-list-item' key={key}>
            <div id='article-list'>
              <Link to={`/article/${article.name}`}>
                <h3>{article.title}</h3>
              </Link>
              <img
                id='delete-icon'
                src={deleteIcon}
                alt='delete-icon'
                height='25px'
                onClick={() => deleteArticle(article.name)}
              />
            </div>
            <Link to={`/article/${article.name}`}>
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
