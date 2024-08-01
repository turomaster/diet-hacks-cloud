import { RxHamburgerMenu } from 'react-icons/rx';
import { IoLogoDocker } from 'react-icons/io5';

type Props = {
  isMobile: boolean;
};

export function Header({ isMobile }: Props) {
  return (
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
          <RxHamburgerMenu className="text-2xl" />
        </div>
      </div>
    </header>
  );
}
