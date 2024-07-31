import { RxHamburgerMenu } from 'react-icons/rx';
import { IoLogoDocker } from 'react-icons/io5';

type Props = {
  isMobile: boolean;
};

export function Header({ isMobile }: Props) {
  return (
    <header className="bg-accent-gray">
      <div className="flex justify-between items-center px-4 h-14">
        <div>
          {isMobile ? (
            <RxHamburgerMenu className="text-2xl" />
          ) : (
            <IoLogoDocker className="text-2xl" />
          )}
        </div>
        <div>
          {isMobile ? (
            <IoLogoDocker className="text-2xl" />
          ) : (
            <RxHamburgerMenu className="text-2xl" />
          )}
        </div>
      </div>
    </header>
  );
}
