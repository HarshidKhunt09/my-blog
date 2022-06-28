import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import AddArticlePage from './pages/AddArticlePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SignOut from './pages/SignOut';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import YourArticlesList from './components/YourArticlesList';
import PrivateRoute from './auth/PrivateRoute';
import './App.css';
import { createContext, useReducer, useState } from 'react';
import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();
export const ArticlesDataContext = createContext();

function App() {
  const [articlesData, setArticlesData] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const addArticlesHandler = (articlesDetail) => {
    setArticlesData([...articlesData, articlesDetail]);
  };

  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <ArticlesDataContext.Provider value={articlesData}>
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
                    <ArticlePage />
                  </PrivateRoute>
                }
              />
              <Route
                path='/add-article'
                element={
                  <AddArticlePage addArticlesHandler={addArticlesHandler} />
                }
              />
              <Route
                path='/articles/your-articles'
                element={<YourArticlesList />}
              />
              <Route path='/signIn' element={<SignInPage />} />
              <Route path='/signUp' element={<SignUpPage />} />
              <Route path='/signOut' element={<SignOut />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </ArticlesDataContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
