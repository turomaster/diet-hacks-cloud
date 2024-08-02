import { Link } from 'react-router-dom';

type Props = {
  onClick: (name: string | null) => void;
};

export function MobileMenu({ onClick }: Props) {
  return (
    <div className="absolute top-[56px] inset-0 bg-white">
      <nav>
        <ul className="flex flex-col items-center text-center">
          <li className="rounded-lg mx-4 mb-4 bg-accent-gray w-80 mt-4">
            <Link to="/" onClick={() => onClick(null)}>
              Home
            </Link>
          </li>
          <li className="rounded-lg mx-4 mb-4 bg-accent-gray w-80">
            <Link to="/" onClick={() => onClick(null)}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
