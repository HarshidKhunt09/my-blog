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
import PrivateRoute from './auth/PrivateRoute';
import './App.css';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
                  <ArticlePage />
                </PrivateRoute>
              }
            />
            <Route path='/add-article' element={<AddArticlePage />} />
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
