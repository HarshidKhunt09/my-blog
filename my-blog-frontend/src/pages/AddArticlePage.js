import React, { useState } from 'react';
import useToken from '../auth/useToken';

const AddArticlePage = ({ addArticlesHandler }) => {
  const [token] = useToken();

  const [articleName, setArticleName] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState([]);

  const addArticle = async () => {
    console.log({ articleName, articleTitle, articleContent });
    const result = await fetch('/api/articles/add-article', {
      method: 'post',
      body: JSON.stringify({
        articleName,
        articleTitle,
        articleContent,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const body = await result.json();

    addArticlesHandler(body.articlesDetail);
  };

  return (
    <div id='add-article-form'>
      <h1>Add Article</h1>
      <label>
        Article Name:
        <input
          type='text'
          value={articleName}
          onChange={(e) => setArticleName(e.target.value)}
        />
      </label>
      <label>
        Article Title:
        <input
          type='text'
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />
      </label>
      <label>
        Article Content:
        <textarea
          rows='10'
          cols='50'
          value={articleContent}
          onChange={(e) => setArticleContent(e.target.value)}
        />
      </label>
      <button onClick={() => addArticle()}>Add Article</button>
    </div>
  );
};

export default AddArticlePage;
