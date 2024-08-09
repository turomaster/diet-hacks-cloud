import { Card } from '../components/Card';
import { Category } from '../lib/data';
import { NavBar } from '../components/NavBar';
import { usePosts } from '../components/usePosts';
import { useState } from 'react';
import { useUser } from '../components/useUser';
import { Posts } from '../components/PostsContext';

type Props = {
  isMobile: boolean | null;
  categories: Category[];
};

export function Home({ isMobile, categories }: Props) {
  const [error, setError] = useState<unknown>();
  const { posts } = usePosts();
  const { token } = useUser();

  async function handleViews(post: Posts) {
    try {
      const updatedPost = {
        ...post,
        views: post.views++,
      };
      const req = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      };
      const res = await fetch(`/api/posts/${post.postId}`, req);
      if (!res.ok) throw new Error(`fetch Error: ${res.status}`);
    } catch (error) {
      setError(error);
    }
  }

  if (error || !posts) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="fixed w-12 h-full">
        {!isMobile && <NavBar categories={categories} />}
      </div>
      <div
        className={
          isMobile ? 'basis-full px-8 mt-12' : 'basis-full ml-52 mt-12 px-8'
        }>
        {posts.map((post) => (
          <Card
            key={post.postId}
            post={post}
            handleViews={() => handleViews(post)}
          />
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
