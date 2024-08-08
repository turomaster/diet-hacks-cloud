import { useContext } from 'react';
import { PostsContextValues, PostsContext } from './PostsContext';

export function usePosts(): PostsContextValues {
  const values = useContext(PostsContext);
  if (!values) throw new Error('usePosts must be used inside a PostsProvider');
  return values;
}
