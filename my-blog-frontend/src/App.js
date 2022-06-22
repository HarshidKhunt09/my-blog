import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <div id='page-body'>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/articles-list' element={<ArticleListPage />} />
          <Route path='/article/:name' element={<ArticlePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
