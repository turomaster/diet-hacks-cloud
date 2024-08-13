import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Category, getCategories } from './lib/data';
import { Details } from './pages/PostDetails';
import { AuthPage } from './pages/AuthPage';
import { UserProvider } from './components/UserContext';
import { CreatePost } from './pages/CreatePost';
import { PostsProvider } from './components/PostsContext';
import { NotFound } from './pages/NotFound';

export function App() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    function onResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <UserProvider>
      <PostsProvider>
        <Routes>
          <Route
            path="/"
            element={<Header isMobile={isMobile} categories={categories} />}>
            <Route
              index
              element={
                <Home
                  categories={categories}
                  isMobile={isMobile}
                  error={error}
                />
              }
            />
            <Route
              path={`/post/:postId`}
              element={<Details isMobile={isMobile} categories={categories} />}
            />
            <Route
              path="/sign-in"
              element={<AuthPage isMobile={isMobile} mode="sign-in" />}
            />
            <Route
              path="/sign-up"
              element={<AuthPage isMobile={isMobile} mode="sign-up" />}
            />
            <Route
              path="/create-post"
              element={
                <CreatePost isMobile={isMobile} categories={categories} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </PostsProvider>
    </UserProvider>
  );
}
