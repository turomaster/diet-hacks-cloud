import { Link } from 'react-router-dom';
import { Category } from '../lib/data';

type Props = {
  categories: Category[];
  handleNavClick: (name: string | null) => void;
};

export function NavBar({ categories, handleNavClick }: Props) {
  return (
    <div className="bg-accent-gray shadow-md h-full w-56">
      <nav>
        <ul className="flex flex-col text-center">
          <li className="mb-2 font-bold">Explore</li>
          <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
            <Link to="/" onClick={() => handleNavClick(null)}>
              Home
            </Link>
          </li>
          <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
            <Link to="/" onClick={() => handleNavClick('trending')}>
              Trending
            </Link>
          </li>
          <hr className="my-6 mx-auto w-40 border-black border-opacity-20" />
          <li className="mb-2 font-bold">Categories</li>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleNavClick(category.name)}
              className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="/">{category.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
