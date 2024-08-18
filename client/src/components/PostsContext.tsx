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
  handleVote: (postId: number, type: string) => void;
  isMenuVisible: boolean | undefined;
};

export const PostsContext = createContext<PostsContextValues>({
  posts: undefined,
  postVotes: undefined,
  fetchPosts: () => undefined,
  handleViews: () => undefined,
  fetchCategoryName: () => undefined,
  handleMenuClick: () => undefined,
  handleVote: () => undefined,
  isMenuVisible: undefined,
});

type Props = {
  children: ReactNode;
};

export function PostsProvider({ children }: Props) {
  const [posts, setPosts] = useState<UserPost[] | Posts[]>([]);
  const [postVotes, setPostVotes] = useState<PostVotes[] | undefined>([]);
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
    checkVote();
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

  // Get votes for all posts and updates state
  async function checkVote() {
    try {
      const result = await fetch(`/api/postVotes`);
      if (!result.ok) throw new Error(`fetch Error: ${result.status}`);
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

  // Increase view count when post is clicked on, send PUT request to update view count
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

  async function handleVote(postId: number, type: string) {
    try {
      if (!user) {
        alert('You must be logged in to vote.');
        return;
      }
      const existingVote = await checkIfVoteExists(postId);
      if (existingVote) {
        const result = await removeVote(postId);
        setPostVotes(result);
        return;
      }
      const newVote = {
        userId: user?.userId,
        postId: postId,
        voteType: type === 'upvote' ? 'upvote' : 'downvote',
      };
      const req = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVote),
      };
      const postResult = await fetch(`/api/postVotes/${postId}`, req);
      if (!postResult.ok) throw new Error(`fetch Error: ${postResult.status}`);
      const allPostVotes = (await postResult.json()) as PostVotes[];
      setPostVotes(allPostVotes);
    } catch (error) {
      setError(error);
    }
  }

  // Check if one or more postId's in the postVotes table exists, if so return true
  async function checkIfVoteExists(postId: number) {
    try {
      const totalVotes: PostVotes[] = [];
      postVotes?.forEach((vote) => {
        if (vote.postId === postId && user?.userId === vote.userId) {
          totalVotes.push(vote);
        }
      });
      if (totalVotes.length >= 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      setError(error);
    }
  }

  async function removeVote(postId: number) {
    try {
      const req = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const deleteResult = await fetch(`/api/postVotes/${postId}`, req);
      if (!deleteResult.ok)
        throw new Error(`fetch Error: ${deleteResult.status}`);
      return (await deleteResult.json()) as PostVotes[];
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
    handleVote,
    isMenuVisible,
  };
  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
}
