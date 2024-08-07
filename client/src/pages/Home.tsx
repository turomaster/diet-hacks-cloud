import { Card } from '../components/Card';
import { Category, UserPost } from '../lib/data';
import { NavBar } from '../components/NavBar';

type Props = {
  isMobile: boolean | null;
  posts: UserPost[] | Posts[];
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
      <div className="fixed w-12 h-full">
        {!isMobile && (
          <NavBar handleNavClick={handleNavClick} categories={categories} />
        )}
      </div>
      <div className={isMobile ? 'basis-full px-8' : 'basis-full ml-52 px-8'}>
        {posts.map((post) => (
          <Card key={post.id} post={post} />
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
