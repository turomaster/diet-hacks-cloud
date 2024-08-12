import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';
import { useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Category } from '../lib/data';
import { useUser } from './useUser';
import { usePosts } from './usePosts';
import { MdFastfood } from 'react-icons/md';

type Props = {
  isMobile: boolean | null;
  categories: Category[];
};

export function Header({ isMobile, categories }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { user, handleSignOut } = useUser();
  const menu = useRef<HTMLDivElement>(null);
  const { fetchCategoryName, handleMenuClick, isMenuVisible } = usePosts();
  const navigate = useNavigate();

  function handleClick() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  function handleSignInOrOut() {
    if (user) {
      handleSignOut();
      fetchCategoryName(null);
    } else {
      fetchCategoryName(null);
      navigate('/sign-in');
    }
  }

  return (
    <>
      <header className="bg-accent-gray fixed w-full">
        <div
          className={
            isMobile
              ? 'flex justify-between items-center px-4 h-14'
              : 'flex justify-between items-center px-10 h-14'
          }>
          <div className="flex items-center space-x-2">
            <MdFastfood className="text-2xl" style={{ color: '#32CD32' }} />
            <p className="text-lg">Diet Hacks</p>
          </div>
          <div ref={menu}>
            <RxHamburgerMenu onClick={handleMenuClick} className="text-2xl" />
          </div>
        </div>
      </header>
      <Outlet />
      {!isMobile && (
        <DesktopMenu position={menu.current}>
          <nav>
            <ul className="flex flex-col items-center bg-accent-gray border-2 rounded-lg">
              <li className="flex justify-center rounded-lg  hover:bg-gray-200 mt-2 w-56">
                <Link to="/" onClick={() => fetchCategoryName(null)}>
                  Home
                </Link>
              </li>
              <li className="flex flex-col justify-center items-center rounded-lg mx-4  mt-2 w-56">
                <span>Categories</span>
                <IoMdArrowDropdown onClick={handleClick} className="text-xl" />
                <ul className="flex flex-col items-center">
                  {open &&
                    categories.map((category) => (
                      <li
                        key={category.categoryId}
                        className="hover:bg-gray-200 text-center rounded-lg w-56">
                        <Link
                          to="/"
                          onClick={() => fetchCategoryName(category.name)}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              {user && (
                <li className="flex justify-center flex-col items-center rounded-lg  hover:bg-gray-200 mt-2 mb-2 w-56">
                  <Link to="/create-post" onClick={handleMenuClick}>
                    Make a Post
                  </Link>
                </li>
              )}
              {!user && (
                <li className="flex justify-center flex-col items-center rounded-lg  hover:bg-gray-200 mt-2 mb-2 w-56">
                  <Link to="/sign-in" onClick={handleSignInOrOut}>
                    Sign In
                  </Link>
                </li>
              )}
              {!user && (
                <li className="flex justify-center flex-col items-center rounded-lg  hover:bg-gray-200 mt-2 mb-2 w-56">
                  <Link to="/sign-up" onClick={handleSignInOrOut}>
                    Register
                  </Link>
                </li>
              )}
              {user && (
                <li className="flex justify-center flex-col items-center rounded-lg  hover:bg-gray-200 mt-2 mb-2 w-56">
                  <Link to="/sign-in" onClick={handleSignInOrOut}>
                    Sign Out
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </DesktopMenu>
      )}
      {isMenuVisible && isMobile && (
        <MobileMenu handleSignInOrOut={handleSignInOrOut} />
      )}
    </>
  );
}
