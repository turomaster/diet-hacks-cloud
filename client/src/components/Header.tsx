import { RxHamburgerMenu } from 'react-icons/rx';
import { IoLogoDocker } from 'react-icons/io5';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';
import { useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Category } from '../lib/data';
import { useUser } from './useUser';

type Props = {
  isMobile: boolean | null;
  handleNavClick: (name: string | null) => void;
  handleMenuClick: () => void;
  isMenuVisible: boolean;
  categories: Category[];
  isStickyHeader: boolean;
};

export function Header({
  isMobile,
  handleNavClick,
  handleMenuClick,
  isMenuVisible,
  categories,
  isStickyHeader,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { user, handleSignOut } = useUser();
  const menu = useRef<HTMLDivElement>(null);
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
      handleNavClick(null); // Closes menu by setting menuIsVisible to false
    } else {
      handleNavClick(null);
      navigate('/sign-in');
    }
  }

  return (
    <>
      <header
        className={
          isStickyHeader ? 'sticky top-0 bg-accent-gray' : 'bg-accent-gray'
        }>
        <div
          className={
            isMobile
              ? 'flex justify-between items-center px-4 h-14'
              : 'flex justify-between items-center px-10 h-14'
          }>
          <div className="flex items-center space-x-2">
            <IoLogoDocker className="text-2xl" />
            <p className="text-lg">Diet Hacks</p>
          </div>
          <div ref={menu}>
            <RxHamburgerMenu onClick={handleMenuClick} className="text-2xl" />
          </div>
        </div>
      </header>
      <Outlet />
      {!isMobile && (
        <DesktopMenu position={menu.current} isMenuVisible={isMenuVisible}>
          <nav>
            <ul className="flex flex-col items-center bg-accent-gray border-2 rounded-lg">
              <li className="flex justify-center rounded-lg  hover:bg-gray-200 mt-2 w-56">
                <Link to="/" onClick={() => handleNavClick(null)}>
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
                        key={category.id}
                        className="hover:bg-gray-200 text-center rounded-lg w-56">
                        <Link
                          to="/"
                          onClick={() => handleNavClick(category.name)}>
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
                  <Link to="/" onClick={handleSignInOrOut}>
                    Sign Out
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </DesktopMenu>
      )}
      {isMenuVisible && isMobile && (
        <MobileMenu
          handleSignInOrOut={handleSignInOrOut}
          handleNavClick={handleNavClick}
          handleMenuClick={handleMenuClick}
        />
      )}
    </>
  );
}
