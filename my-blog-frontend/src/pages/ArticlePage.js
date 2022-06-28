import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';
import NotFoundPage from './NotFoundPage';
// import articleContent from './article-content';
import useToken from '../auth/useToken';

const ArticlePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useToken();
  const { name } = useParams();
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState([]);
  const article = articleList.find((article) => article.name === name);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`/api/articles/${name}`, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const body = await result.json();
        setArticleInfo(body);
        console.log(body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`/api/articles/${name}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const body = await result.json();
        const { message } = body;
        if (message === 'Unable to verify token' && result.status === 401) {
          navigate('/signUp');
        }
        setArticleInfo(body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name, navigate, token]);

  if (!article) return <NotFoundPage />;

  const otherArticles = articleList.filter((article) => article.name !== name);

  return (
    <>
      <h1>{article.title}</h1>
      <UpvotesSection
        articleName={name}
        articleInfo={articleInfo}
        setArticleInfo={setArticleInfo}
      />
      {article.content.map((paragraph, key) => {
        return <p key={key}>{paragraph}</p>;
      })}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h3>Other Articles:</h3>
      <ArticleList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
