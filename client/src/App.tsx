import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  Category,
  getCategories,
  getPosts,
  getPostsByCategory,
  Posts,
  UserPost,
} from './lib/data';
import { Details } from './pages/Details';
import { AuthPage } from './pages/AuthPage';
import { UserProvider } from './components/UserContext';
import { CreatePost } from './pages/CreatePost';

export function App() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [posts, setPosts] = useState<UserPost[] | Posts[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = categoryName
          ? await getPostsByCategory(categoryName)
          : await getPosts();
        setPosts(data);
      } catch (error) {
        setError(error);
      }
    }
    loadPosts();
  }, [categoryName]);

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

  async function handleNavClick(name: string | null) {
    setIsMenuVisible(false);
    if (name === 'trending') {
      try {
        const data = await getPosts();
        const postsTrending = data.sort((a, b) => b.views - a.views);
        setPosts(postsTrending);
      } catch (error) {
        setError(error);
      }
    } else {
      setCategoryName(name);
    }
    navigate('/');
  }

  function handleMenuClick() {
    setIsMenuVisible(!isMenuVisible);
  }

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <UserProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Header
              handleMenuClick={handleMenuClick}
              isMenuVisible={isMenuVisible}
              handleNavClick={handleNavClick}
              isMobile={isMobile}
              categories={categories}
            />
          }>
          <Route
            index
            element={
              <Home
                handleNavClick={handleNavClick}
                categories={categories}
                posts={posts}
                isMobile={isMobile}
                error={error}
              />
            }
          />
          <Route
            path={`/post/:postId`}
            element={
              <Details
                posts={posts}
                isMobile={isMobile}
                categories={categories}
                handleNavClick={handleNavClick}
              />
            }
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
            element={<CreatePost isMobile={isMobile} categories={categories} />}
          />
        </Route>
      </Routes>
    </UserProvider>
  );
}
