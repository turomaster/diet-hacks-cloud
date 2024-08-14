import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Category, Comments, getComments } from '../lib/data';
import { NavBar } from '../components/NavBar';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { usePosts } from '../components/usePosts';
import { useUser } from '../components/useUser';

type Props = {
  isMobile: boolean | null;
  categories: Category[];
};

export function PostDetails({ isMobile, categories }: Props) {
  const [error, setError] = useState<unknown>();
  const [comments, setComments] = useState<Comments[]>([]);
  const [replyToUser, setReplyToUser] = useState<string>();
  const { postId } = useParams();
  const { posts } = usePosts();
  const { user, token } = useUser();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  // Set the cursor after the username that you are replying to
  useEffect(() => {
    if (textareaRef.current) {
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
      textareaRef.current.focus();
    }
  }, [replyToUser]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const newComment = {
        ...userData,
        userId: user?.userId,
        username: user?.username,
      };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      };
      const res = await fetch(`/api/comments/${postId}`, req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      if (postId) {
        const result = await getComments(+postId);
        setComments(result);
      }
      const target = event.target as HTMLFormElement;
      target.reset();
    } catch (err) {
      alert(`Error signing in: ${err}`);
    }
  }

  function handleReplyClick(username: string) {
    setReplyToUser(username);
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
      <div className="flex">
        {!isMobile && <NavBar categories={categories} />}
      </div>
      <div className="mt-12 basis-full px-8">
        {postId &&
          posts.map(
            (post) =>
              post.postId === +postId && <Card key={post.postId} post={post} />
          )}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4 flex shadow-md">
            <textarea
              name="content"
              rows={2}
              ref={textareaRef}
              className="w-full text-sm pt-2 pl-2 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400"
              placeholder="Write a comment..."
              defaultValue={replyToUser && `@${replyToUser}`}
              required
            />
          </div>
          <button
            type="submit"
            className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lime-green rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green-600">
            Post comment
          </button>
        </form>
        <div className="shadow-md pl-2 py-2">
          <ul>
            {comments.map((comment) => (
              <div key={comment.commentId}>
                <span>@{comment.username}</span>
                <li>{comment.content}</li>
                <div className="flex items-center mb-2">
                  <button onClick={() => handleReplyClick(comment.username)}>
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
