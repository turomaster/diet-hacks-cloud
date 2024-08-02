import { RxHamburgerMenu } from 'react-icons/rx';
import { IoLogoDocker } from 'react-icons/io5';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu';

type Props = {
  isMobile: boolean | null;
};

export function Header({ isMobile }: Props) {
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  function handleMenuClick() {
    if (!isComponentVisible) {
      setIsComponentVisible(true);
    } else {
      setIsComponentVisible(false);
    }
  }

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
          <div>
            <RxHamburgerMenu onClick={handleMenuClick} className="text-2xl" />
          </div>
        </div>
      </header>
      <Outlet />
      {isComponentVisible && isMobile && (
        <MobileMenu onClick={handleMenuClick} />
      )}
    </>
  );
}
