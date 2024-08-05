import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category, getCategories } from '../lib/data';
import { IoMdArrowDropdown } from 'react-icons/io';

type Props = {
  handleNavClick: (name: string | null) => void;
};

export function MobileMenu({ handleNavClick }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

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
    <div className="absolute top-[56px] inset-0 bg-white">
      <nav>
        <ul className="flex flex-col items-center text-center">
          <li className="rounded-lg mx-4 mb-4 bg-accent-gray w-80 mt-4">
            <Link to="/" onClick={() => handleNavClick(null)}>
              Home
            </Link>
          </li>
          <li className="flex flex-col justify-center items-center rounded-lg mx-4 mb-4 bg-accent-gray w-80 mt-2">
            <span>Categories</span>
            <IoMdArrowDropdown onClick={handleClick} className="text-xl" />
            <ul>
              {open &&
                categories.map((category) => (
                  <li key={category.id}>
                    <Link to="#" onClick={() => handleNavClick(category.name)}>
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
          <li className="rounded-lg mx-4 mb-4 mt-2 bg-accent-gray w-80">
            <Link to="/" onClick={() => handleNavClick(null)}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
