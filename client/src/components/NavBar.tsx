export function NavBar() {
  return (
    <div className="bg-accent-gray px-2 pt-6">
      <nav>
        <ul className="flex flex-col items-center">
          <li className="text-lg mb-2">Explore</li>
          <li>Home</li>
          <li>Trending</li>
          <li>
            <hr className="h-px my-4 bg-gray-200 border-0" />
          </li>
          <li className="text-lg mb-2">Categories</li>
          <li>Fast Food</li>
          <li>Snacks</li>
        </ul>
      </nav>
    </div>
  );
}
