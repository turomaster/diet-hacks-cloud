import { Card } from '../components/Card';
import { Category, Posts } from '../lib/data';
import { NavBar } from '../components/NavBar';

type Props = {
  isMobile: boolean | null;
  posts: Posts[];
  categories: Category[];
  handleNavClick: (name: string | null) => void;
  error: unknown;
};

export function Home({
  isMobile,
  posts,
  categories,
  handleNavClick,
  error,
}: Props) {
  if (error || !posts) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex">
        {!isMobile && (
          <NavBar handleNavClick={handleNavClick} categories={categories} />
        )}
      </div>
      <div className="basis-full px-8">
        {posts.map((post, index) => (
          <Card key={post.title + index} post={post} />
        ))}
        {!posts.length && (
          <div className="flex justify-center mt-2">
            <p className="text-xl">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
