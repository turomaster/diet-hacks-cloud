import { FormEvent, useEffect } from 'react';
import { Category } from '../lib/data';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { usePosts } from './usePosts';

type Props = {
  categories: Category[];
  isMobile: boolean | null;
};

export function PostForm({ categories, isMobile }: Props) {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const { fetchPosts } = usePosts();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const newPost = {
        ...userData,
        userId: user?.userId,
      };
      const req = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      };
      const res = await fetch('/api/posts', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      alert(`Successfully created post.`);
      fetchPosts();
      navigate('/');
    } catch (err) {
      alert(`Error posting: ${err}`);
    }
  }

  return (
    <div
      className={
        isMobile
          ? 'flex flex-col items-center mt-12 py-8 px-24 rounded-md bg-accent-gray'
          : 'flex flex-col items-center mt-12 py-8 px-32 rounded-md bg-accent-gray'
      }>
      <h2 className="text-2xl font-bold mb-2">Submit a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-1">
          <div className={isMobile ? 'w-50' : 'w-72'}>
            <label className="mb-1 block">
              Title
              <input
                required
                name="title"
                type="text"
                className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
              />
            </label>
            <label className="mb-1 block">
              Category
              <select
                required
                name="categoryId"
                className="block border border-gray-600 rounded p-2 h-10 w-full mb-2">
                {categories.map((category) => (
                  <option
                    key={category.categoryId}
                    value={`${category.categoryId}`}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="mb-1 block">
              Calories (Optional)
              <input
                name="calories"
                type="number"
                placeholder="0"
                className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
              />
            </label>
            <label className="mb-1 block">
              Message
              <textarea
                name="body"
                required
                placeholder="Post your diet hack..."
                className="block border border-gray-600 rounded p-2 h-20 w-full mb-2"></textarea>
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="align-middle text-center border rounded py-2.5 px-6 text-xs font-medium bg-green-400 text-white hover:bg-green-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
