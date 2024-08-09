import { createContext, ReactNode, useEffect, useState } from 'react';
import { getPosts, getPostsByCategory } from '../lib/data';
import { User } from './UserContext';
import { useUser } from './useUser';

export type Posts = {
  postId: number;
  title: string;
  calories: number;
  body: string;
  userId: number;
  categoryId: number;
  totalVotes: number;
  views: number;
  createdAt: string;
};

export type UserPost = Posts & User;

export type PostsContextValues = {
  posts: UserPost[] | Posts[] | undefined;
  fetchPosts: () => void;
  handleViews: (post: Posts) => void;
  fetchCategoryName: (categoryName: string | null) => void;
  handleMenuClick: () => void;
  isMenuVisible: boolean | undefined;
};

export const PostsContext = createContext<PostsContextValues>({
  posts: undefined,
  fetchPosts: () => undefined,
  handleViews: () => undefined,
  fetchCategoryName: () => undefined,
  handleMenuClick: () => undefined,
  isMenuVisible: undefined,
});

type Props = {
  children: ReactNode;
};

export function PostsProvider({ children }: Props) {
  const [posts, setPosts] = useState<UserPost[] | Posts[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [error, setError] = useState<unknown>();
  const { token } = useUser();

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

  async function fetchPosts() {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      setError(error);
    }
  }

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

  function fetchCategoryName(categoryName: string | null) {
    setCategoryName(categoryName);
    setIsMenuVisible(false);
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

  const contextValue = {
    posts,
    fetchPosts,
    handleViews,
    fetchCategoryName,
    handleMenuClick,
    isMenuVisible,
  };
  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
}
