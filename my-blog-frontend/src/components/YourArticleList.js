import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const YourArticleList = ({ articles, deleteArticleHandler }) => {
  return (
    <>
      {articles?.map((article, key) => {
        return (
          <div className='article-list-item' key={key}>
            <div id='article-list'>
              <Link to={`/article/${article.name}`}>
                <h3>{article.title}</h3>
              </Link>
              <FontAwesomeIcon
                icon={faTrashCan}
                id='delete-icon'
                alt='delete-icon'
                height='25px'
                onClick={() => deleteArticleHandler(article.name)}
              />
              <Link to={`/article/edit/${article.name}`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  id='edit-icon'
                  alt='edit-icon'
                  height='25px'
                />
              </Link>
            </div>
            <Link to={`/article/${article?.name}`}>
              <h6>Name: {article?.name}</h6>
              <p>{article?.content[0]?.substring(0, 150)}...</p>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default YourArticleList;
