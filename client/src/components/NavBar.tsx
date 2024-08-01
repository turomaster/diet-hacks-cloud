import { Link } from 'react-router-dom';

export function NavBar() {
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
            <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="#">Breakfast</Link>
            </li>
            <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="#">Dinner</Link>
            </li>
            <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="#">Snacks</Link>
            </li>
            <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="#">Fast Food</Link>
            </li>
            <li className="rounded-lg mx-4 mb-4 hover:bg-gray-200">
              <Link to="#">Ingredient Swaps</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
