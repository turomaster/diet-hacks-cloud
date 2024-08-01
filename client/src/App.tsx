import { Header } from './components/Header';
import { Card } from './components/Card';
import { useEffect, useState } from 'react';
import { Category, getCategories, getPosts, Posts } from './lib/data';
import { NavBar } from './components/NavBar';
import './App.css';

export function App() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<unknown>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        setError(error);
      }
    }
    loadPosts();
  }, []);

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

  if (error || !posts) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <>
      <Header isMobile={isMobile} />
      <div className="flex h-full">
        {!isMobile && <NavBar categories={categories} />}
        <div className="flex mx-auto">
          <div className="basis-full p-4">
            {posts.map((post, index) => (
              <Card key={post.title + index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
