import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import {
  Category,
  getCategories,
  getPosts,
  getPostsByCategory,
  Posts,
} from '../lib/data';
import { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';

type Props = {
  isMobile: boolean;
};

export function Home({ isMobile }: Props) {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<unknown>();

  const { categoryName } = useParams();

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
    async function loadPosts() {
      try {
        if (categoryName) {
          const data = await getPostsByCategory(categoryName);
          setPosts(data);
        } else {
          const data = await getPosts();
          setPosts(data);
        }
      } catch (error) {
        setError(error);
      }
    }
    loadPosts();
  }, [categoryName]);

  if (error || !posts) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex">
        {!isMobile && <NavBar categories={categories} />}
      </div>
      <div className="basis-full px-8">
        {posts.map((post, index) => (
          <Card key={post.title + index} post={post} />
        ))}
        {!posts.length && (
          <div className="flex justify-center mt-2">
            <p className="text-xl">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
