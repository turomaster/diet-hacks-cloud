import { PiArrowFatDownFill, PiArrowFatUp } from 'react-icons/pi';
import { PiArrowFatUpFill } from 'react-icons/pi';
import { PiArrowFatDown } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { usePosts } from './usePosts';
import { useUser } from './useUser';
import { UserPost } from './PostsContext';

type Props = {
  post: UserPost;
};

export function Card({ post }: Props) {
  const { postVotes, handleViews, handleUpvote, handleDownvote } = usePosts();
  const { user } = useUser();
  let totalVotes = 0;

  const upvoteResult = postVotes?.find(
    (vote) =>
      vote.postId === post.postId &&
      user?.userId === vote.userId &&
      vote.voteType === 'upvote'
  );

  const downvoteResult = postVotes?.find(
    (vote) =>
      vote.postId === post.postId &&
      user?.userId === vote.userId &&
      vote.voteType === 'downvote'
  );

  postVotes?.forEach((vote) => {
    if (vote.postId === post.postId) {
      if (vote.voteType === 'upvote') {
        totalVotes++;
      } else if (vote.voteType === 'downvote') {
        totalVotes--;
      }
    }
  });

  return (
    <div
      className="card flex flex-col shadow-md p-4 my-4"
      onClick={() => handleViews(post)}>
      <Link to={`/post/${post.postId}`}>
        <div className="card-title font-bold">{post.title}</div>
        <div className="card-calories text-gray-400 py-2 min-h-10">
          {post.calories ? post.calories + ' Calories' : ''}
        </div>
        <div className="card-body text-sm">{post.body}</div>
      </Link>
      <div className="card-footer flex flex-wrap mt-4">
        <div className="flex basis-full justify-between">
          <div className="vote-actions flex items-center">
            {upvoteResult && (
              <PiArrowFatUpFill
                className="cursor-pointer text-2xl"
                onClick={() => handleUpvote(post.postId)}
              />
            )}
            {!upvoteResult && (
              <PiArrowFatUp
                className="cursor-pointer text-2xl"
                onClick={() => handleUpvote(post.postId)}
              />
            )}
            <div className="total-votes px-2">{totalVotes}</div>
            {downvoteResult && (
              <PiArrowFatDownFill
                className="cursor-pointer text-2xl"
                onClick={() => handleDownvote(post.postId)}
              />
            )}
            {!downvoteResult && (
              <PiArrowFatDown
                className="cursor-pointer text-2xl"
                onClick={() => handleDownvote(post.postId)}
              />
            )}
          </div>
        </div>
        <div className="basis-full pt-2">
          <p>@{post.username}</p>
        </div>
      </div>
    </div>
  );
}
