import { MdFavoriteBorder } from 'react-icons/md';
import { IoShareOutline } from 'react-icons/io5';
import { PiArrowFatUp } from 'react-icons/pi';
import { PiArrowFatDown } from 'react-icons/pi';
import { Link } from 'react-router-dom';

export function Card({ post }) {
  return (
    <Link to={'/'}>
      <div className="card flex flex-col shadow-md p-4 my-4">
        <div className="card-title font-bold">{post.title}</div>
        <div className="card-calories text-gray-400 py-2 min-h-10">
          {post.calories ? post.calories + ' Calories' : ''}
        </div>
        <div className="card-body text-sm">{post.body}</div>
        <div className="card-footer flex mt-4">
          <div className="basis-1/2">
            <div className="vote-actions flex items-center">
              <PiArrowFatUp className="text-2xl" />
              <div className="total-votes px-2">
                {!post.totalVotes ? 0 : post.totalVotes}
              </div>
              <PiArrowFatDown className="text-2xl" />
            </div>
          </div>
          <div className="basis-1/2">
            <div className="post-actions flex justify-end items-center">
              <MdFavoriteBorder className="text-2xl mx-2" />
              <IoShareOutline className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
