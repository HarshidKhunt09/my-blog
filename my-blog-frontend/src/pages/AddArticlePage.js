import React, { useState } from 'react';
import useUser from '../auth/useUser';

const AddArticlePage = () => {
  const user = useUser();

  const [articleName, setArticleName] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState([]);

  const addArticle = async () => {
    const result = await fetch('/api/articles/add-article', {
      method: 'post',
      body: JSON.stringify({
        _id: user.id,
        name: user.name,
        email: user.email,
        articleName,
        articleTitle,
        articleContent,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await result.json();
    console.log(body);
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
