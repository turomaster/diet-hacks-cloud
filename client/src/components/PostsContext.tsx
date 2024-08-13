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
  voteTypeId: number;
  userId: number;
  postId: number;
  totalVotes: number;
  voteType: string;
};

export type UserPost = Posts & User;

export type PostsContextValues = {
  posts: UserPost[] | Posts[] | undefined;
  postVotes: PostVotes[] | undefined;
  fetchPosts: () => void;
  handleViews: (post: Posts) => void;
  fetchCategoryName: (categoryName: string | null) => void;
  handleMenuClick: () => void;
  handleUpvote: (postId: number) => void;
  isMenuVisible: boolean | undefined;
};

export const PostsContext = createContext<PostsContextValues>({
  posts: undefined,
  postVotes: undefined,
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
  const [postVotes, setPostVotes] = useState<PostVotes[]>([]);
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
    checkUpvote();
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

  async function checkUpvote() {
    try {
      const result = await fetch(`/api/postVotes`);
      const allPostVotes = (await result.json()) as PostVotes[];
      setPostVotes(allPostVotes);
    } catch (error) {
      setError(error);
    }
  }

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
      const data = await checkIfUpvoteExists(postId);
      if (data) {
        removeUpvote(postId);
        checkUpvote();
        return;
      }
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
      if (!postResult.ok) throw new Error(`fetch Error: ${postResult.status}`);
      checkUpvote();
    } catch (error) {
      setError(error);
    }
  }

  async function checkIfUpvoteExists(postId: number) {
    try {
      const req = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const getResult = await fetch(`/api/postVotes/${postId}`, req);
      console.log('getResult', getResult);
      if (!getResult.ok) throw new Error(`fetch Error: ${getResult.status}`);
      const data = (await getResult.json()) as PostVotes[];
      console.log('data', data);
      if (data.length >= 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      setError(error);
    }
  }

  async function removeUpvote(postId) {
    try {
      const req = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const deleteResult = await fetch(`/api/postVotes/${postId}`, req);
      if (!deleteResult.ok)
        throw new Error(`fetch Error: ${deleteResult.status}`);
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
    postVotes,
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
