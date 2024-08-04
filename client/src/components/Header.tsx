import { RxHamburgerMenu } from 'react-icons/rx';
import { IoLogoDocker } from 'react-icons/io5';
import { Link, Outlet } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';
import { useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Category } from '../lib/data';

type Props = {
  isMobile: boolean | null;
  handleNavClick: (name: string | null) => void;
  handleMenuClick: () => void;
  isComponentVisible: boolean;
  categories: Category[];
};

export function Header({
  isMobile,
  handleNavClick,
  handleMenuClick,
  isComponentVisible,
  categories,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  function handleClick() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const menu = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="bg-accent-gray">
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
        <DesktopMenu
          position={menu.current}
          isComponentVisible={isComponentVisible}>
          <nav>
            <ul className="flex flex-col items-center">
              <li className="flex justify-center rounded-lg bg-accent-gray hover:bg-white mt-2 w-56">
                <Link to="#" onClick={() => handleNavClick(null)}>
                  Home
                </Link>
              </li>
              <li className="flex flex-col justify-center items-center rounded-lg mx-4 bg-accent-gray mt-2 w-56">
                <span>Categories</span>
                <IoMdArrowDropdown onClick={handleClick} className="text-xl" />
                <ul className="flex flex-col items-center">
                  {open &&
                    categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to="#"
                          onClick={() => handleNavClick(category.name)}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li className="flex justify-center rounded-lg bg-accent-gray hover:bg-white mt-2 mb-2 w-56">
                <Link to="#">Sign In</Link>
              </li>
            </ul>
          </nav>
        </DesktopMenu>
      )}
      {isComponentVisible && isMobile && (
        <MobileMenu handleNavClick={handleNavClick} />
      )}
    </>
  );
}
