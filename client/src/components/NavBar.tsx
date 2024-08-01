import { Link } from 'react-router-dom';
import { Category } from '../lib/data';

type Props = {
  categories: Category[];
};

export function NavBar({ categories }: Props) {
  return (
    <div className="bg-accent-gray shadow-md w-56">
      <nav>
        <ul className="flex flex-col text-center">
          <div className="basis-full">
            <li className="mb-2 font-bold">Explore</li>
            <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="#">Home</Link>
            </li>
            <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="#">Trending</Link>
            </li>
          </div>
          <hr className="my-6 mx-auto w-40 border-black border-opacity-20" />
          <div className="basis-full">
            <li className="mb-2 font-bold">Categories</li>
            {categories.map((category, index) => (
              <li
                key={category.id + index}
                className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
                <Link to="#">{category.name}</Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </div>
  );
}
