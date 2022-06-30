import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import AddArticlePage from './pages/AddArticlePage';
import EditArticlePage from './pages/EditArticlePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SignOut from './pages/SignOut';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import YourArticleListPage from './pages/YourArticleListPage';
import PrivateRoute from './auth/PrivateRoute';
import './App.css';
import { createContext, useReducer, useState, useEffect } from 'react';
import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();
export const ArticleDataContext = createContext();

function App() {
  const [articleList, setArticleList] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

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

  console.log(articleList);

  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <NavBar />
        <div id='page-body'>
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/articles-list' element={<ArticleListPage />} />
            <Route
              path='/article/:name'
              element={
                <PrivateRoute>
                  <ArticlePage articleList={articleList} />
                </PrivateRoute>
              }
            />
            <Route
              path='/add-article'
              element={
                <AddArticlePage
                  articleList={articleList}
                  setArticleList={setArticleList}
                />
              }
            />
            <Route
              path='/articles/your-articles'
              element={<YourArticleListPage />}
            />
            <Route
              path='/article/edit/:name'
              element={<EditArticlePage articleList={articleList} />}
            />
            <Route path='/signIn' element={<SignInPage />} />
            <Route path='/signUp' element={<SignUpPage />} />
            <Route path='/signOut' element={<SignOut />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
