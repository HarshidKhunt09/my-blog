import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditArticlePage = ({ articleList, updateArticleHandler }) => {
  const { name } = useParams();
  const navigate = useNavigate();

  const articleDetail = articleList.find((article) => article.name === name);

  const Content = articleDetail.content.toString();

  const [articleName, setArticleName] = useState(articleDetail.name);
  const [articleTitle, setArticleTitle] = useState(articleDetail.title);
  const [articleContent, setArticleContent] = useState(Content);

  const updateArticle = (e) => {
    e.preventDefault();
    const updatedData = async () => {
      try {
        await fetch(`/api/articles/${name}`, {
          method: 'put',
          body: JSON.stringify({
            name: articleName,
            title: articleTitle,
            content: articleContent,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setArticleName('');
        setArticleTitle('');
        setArticleContent('');
        navigate('/articles/your-articles');
      } catch (error) {
        console.log(error);
      }
    };
    updatedData();
  };

  return (
    <div id='add-article-form'>
      <h1>Update Article</h1>
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
      <button onClick={updateArticle}>Update Article</button>
    </div>
  );
};

export default EditArticlePage;
