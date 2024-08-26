import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category, getCategories } from '../lib/data';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useUser } from './useUser';
import { usePosts } from './usePosts';

type Props = {
  onSignInOrOut: () => void;
};

export function MobileMenu({ onSignInOrOut }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const { user } = useUser();
  const { fetchCategoryName, handleMenuClick } = usePosts();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error);
      }
    }
    loadCategories();
  }, []);

  function handleClick() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="fixed top-[56px] inset-0 bg-white">
      <nav>
        <ul className="flex flex-col items-center text-center">
          <li className="rounded-lg mx-4 mb-4 bg-accent-gray w-80 mt-4">
            <Link to="/" onClick={() => fetchCategoryName(null)}>
              Home
            </Link>
          </li>
          <li className="flex flex-col justify-center items-center rounded-lg mx-4 mb-4 bg-accent-gray w-80 mt-2">
            <span>Categories</span>
            <IoMdArrowDropdown onClick={handleClick} className="text-xl" />
            <ul>
              {open &&
                categories.map((category) => (
                  <li key={category.categoryId}>
                    <Link
                      to="/"
                      onClick={() => fetchCategoryName(category.name)}>
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
          {!user && (
            <>
              <li className="rounded-lg mx-4 mb-4 mt-2 bg-accent-gray w-80">
                <Link to="/sign-in" onClick={onSignInOrOut}>
                  Sign In
                </Link>
              </li>
              <li className="rounded-lg mx-4 mb-4 mt-2 bg-accent-gray w-80">
                <Link to="/sign-up" onClick={onSignInOrOut}>
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="rounded-lg mx-4 mb-4 mt-2 bg-accent-gray w-80">
                <Link to="/create-post" onClick={handleMenuClick}>
                  Make a Post
                </Link>
              </li>
              <li className="rounded-lg mx-4 mb-4 mt-2 bg-accent-gray w-80">
                <Link to="/" onClick={onSignInOrOut}>
                  Sign Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
