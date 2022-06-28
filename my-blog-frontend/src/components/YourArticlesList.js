import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from './ArticleList';
import useToken from '../auth/useToken';

const YourArticlesList = () => {
  const navigate = useNavigate();
  const [token] = useToken();
  const [yourArticleList, setYourArticleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('/api/articles/your-articles', {
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
        setYourArticleList(body);
        console.log(body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [navigate, setYourArticleList, token]);

  return <ArticleList articles={yourArticleList} />;
};

export default YourArticlesList;
