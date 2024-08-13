import { PiArrowFatUp } from 'react-icons/pi';
import { PiArrowFatUpFill } from 'react-icons/pi';
import { PiArrowFatDown } from 'react-icons/pi';
import { PiArrowFatDownFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { usePosts } from './usePosts';
import { useUser } from './useUser';
import { UserPost } from './PostsContext';

type Props = {
  post: UserPost;
  handleViews: (postId: number) => void;
  handleUpvote: (postId: number) => void;
};

export function Card({ post, handleViews, handleUpvote }: Props) {
  const { postVotes } = usePosts();
  const { user } = useUser();
  let totalVotes = 0;

  const result = postVotes?.find(
    (vote) => vote.postId === post.postId && user?.userId === vote.userId
  );

  postVotes?.map((vote) => {
    if (vote.postId === post.postId && vote.voteType === 'upvote') {
      totalVotes++;
    }
  });
  
  return (
    <div
      className="card flex flex-col shadow-md p-4 my-4"
      onClick={() => handleViews(post.postId)}>
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
            {result && (
              <PiArrowFatUpFill
                className="cursor-pointer text-2xl"
                onClick={() => handleUpvote(post.postId)}
              />
            )}
            {!result && (
              <PiArrowFatUp
                className="cursor-pointer text-2xl"
                onClick={() => handleUpvote(post.postId)}
              />
            )}
            <div className="total-votes px-2">{totalVotes}</div>
            <PiArrowFatDown className="cursor-pointer text-2xl" />
          </div>
        </div>
        <div className="basis-full pt-2">
          <p>@{post.username}</p>
        </div>
      </div>
    </div>
  );
}
