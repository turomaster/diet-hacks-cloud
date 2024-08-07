import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Category, Comments, getComments, UserPost } from '../lib/data';
import { NavBar } from '../components/NavBar';
import { SlLike } from 'react-icons/sl';
import { SlDislike } from 'react-icons/sl';
import { useEffect, useState } from 'react';

type Props = {
  posts: UserPost[] | Posts[];
  isMobile: boolean | null;
  categories: Category[];
  handleNavClick: (name: string | null) => void;
};

export function Details({
  posts,
  isMobile,
  categories,
  handleNavClick,
}: Props) {
  const [error, setError] = useState<unknown>();
  const [comments, setComments] = useState<Comments[]>([]);
  const [replyToUser, setReplyToUser] = useState<string>();
  const { postId } = useParams();

  useEffect(() => {
    async function loadComments() {
      if (postId) {
        try {
          const data = await getComments(+postId);
          setComments(data);
        } catch (error) {
          setError(error);
        }
      }
    }
    loadComments();
  }, [postId]);

  function handleClick(username: string) {
    setReplyToUser(username);
  }

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex">
        {!isMobile && (
          <NavBar handleNavClick={handleNavClick} categories={categories} />
        )}
      </div>
      <div className="basis-full px-8">
        {postId &&
          posts.map(
            (post) => post.id === +postId && <Card key={post.id} post={post} />
          )}
        <form className="mb-6">
          <div className="mb-4 flex shadow-md">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={2}
              className="w-full text-sm pt-2 pl-2 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400"
              placeholder="Write a comment..."
              defaultValue={replyToUser && `@${replyToUser}`}
              required></textarea>
          </div>
          <button
            type="submit"
            className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green-600">
            Post comment
          </button>
        </form>
        <div className="shadow-md pl-2 py-2">
          <ul>
            {comments.map((comment) => (
              <div key={comment.id}>
                <span>@{comment.username}</span>
                <li>{comment.content}</li>
                <div className="flex items-center mb-2">
                  <SlLike className="mr-2" />
                  <div className="flex min-w-6">12</div>
                  <SlDislike className="mr-2" />
                  <button onClick={() => handleClick(comment.username)}>
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
