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
  views: number;
  createdAt: string;
};

export type PostVotes = {
  userId: number;
  postId: number;
  totalVotes: number;
  voteType: string;
};

export type UserPost = Posts & User;

export type PostsContextValues = {
  posts: UserPost[] | Posts[] | undefined;
  hasUpvoted: boolean | undefined;
  fetchPosts: () => void;
  handleViews: (post: Posts) => void;
  fetchCategoryName: (categoryName: string | null) => void;
  handleMenuClick: () => void;
  handleUpvote: (postId: number) => void;
  isMenuVisible: boolean | undefined;
};

export const PostsContext = createContext<PostsContextValues>({
  posts: undefined,
  hasUpvoted: undefined,
  fetchPosts: () => undefined,
  handleViews: () => undefined,
  fetchCategoryName: () => undefined,
  handleMenuClick: () => undefined,
  handleUpvote: () => undefined,
  isMenuVisible: undefined,
});

type Props = {
  children: ReactNode;
};

export function PostsProvider({ children }: Props) {
  const [posts, setPosts] = useState<UserPost[] | Posts[]>([]);
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [error, setError] = useState<unknown>();
  const { user, token } = useUser();

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

  async function handleUpvote(postId: number) {
    try {
      const upvoteExists = await checkIfUpvoteExists(postId);
      if (!upvoteExists) {
        const newUpvote = {
          userId: user?.userId,
          postId: postId,
          voteType: 'upvote',
          totalVotes: 1,
        };
        const req = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUpvote),
        };
        const postResult = await fetch(`/api/postVotes/${postId}`, req);
        if (!postResult.ok)
          throw new Error(`fetch Error: ${postResult.status}`);
        setHasUpvoted(true);
      } else {
        setHasUpvoted(false);
      }
    } catch (error) {
      setError(error);
    }
  }

  async function checkIfUpvoteExists(postId: number): Promise<boolean> {
    try {
      const getResult = await fetch(`/api/postVotes/${user?.userId}`);
      if (!getResult.ok) throw new Error(`fetch Error: ${getResult.status}`);
      const data = (await getResult.json()) as PostVotes;
      if (data.postId === postId && data.userId === user?.userId) {
        const removeUpvote = {
          userId: user?.userId,
          postId: data.postId,
        };
        const req = {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(removeUpvote),
        };
        const deleteResult = await fetch(`/api/postVotes/${user?.userId}`, req);
        if (!deleteResult.ok)
          throw new Error(`fetch Error: ${deleteResult.status}`);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
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
    hasUpvoted,
    fetchPosts,
    handleViews,
    fetchCategoryName,
    handleMenuClick,
    handleUpvote,
    isMenuVisible,
  };
  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
}
