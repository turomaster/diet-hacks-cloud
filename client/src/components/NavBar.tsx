import { Link } from 'react-router-dom';
import { Category } from '../lib/data';
import { usePosts } from './usePosts';

type Props = {
  categories: Category[];
};

export function NavBar({ categories }: Props) {
  const { fetchCategoryName } = usePosts();
  return (
    <div className="bg-accent-gray h-full w-56 mt-14">
      <nav>
        <ul className="flex flex-col text-center">
          <li className="mb-2 font-bold">Explore</li>
          <li className="rounded-lg mx-4 hover:bg-gray-200">
            <Link to="/" onClick={() => fetchCategoryName(null)}>
              Home
            </Link>
          </li>
          <hr className="my-6 mx-auto w-40 border-black border-opacity-20" />
          <li className="mb-2 font-bold">Categories</li>
          {categories.map((category) => (
            <li
              key={category.categoryId}
              onClick={() => fetchCategoryName(category.name)}
              className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="/">{category.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
