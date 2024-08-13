import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className="flex justify-center items-center basis-full mt-20">
        <h1>Uh oh. Page not found.</h1>
      </div>
      <Link to="/">Return to Home</Link>
    </div>
  );
}
