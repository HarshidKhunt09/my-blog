import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import useToken from '../auth/useToken';

const EditArticlePage = ({ articleList, setArticleList }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [token] = useToken();

  const articleDetail = articleList?.find((article) => article?.name === name);

  console.log({ articleDetail });

  const [articleName, setArticleName] = useState(articleDetail?.name);
  const [articleTitle, setArticleTitle] = useState(articleDetail?.title);
  const [articleContent, setArticleContent] = useState(
    articleDetail?.content?.toString()
  );

  const updateArticle = (e) => {
    e.preventDefault();
    const updatedData = async () => {
      try {
        const result = await fetch(`/api/articles/${name}`, {
          method: 'put',
          body: JSON.stringify({
            name: articleName,
            title: articleTitle,
            content: articleContent,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const body = await result.json();
        setArticleList(
          articleList?.map((article) => {
            return article?.name === body?.name ? { ...body } : article;
          })
        );
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

  if (!articleDetail) return <NotFoundPage />;

  return (
    <div id='update-article-form'>
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
