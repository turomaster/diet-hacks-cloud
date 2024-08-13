import { Card } from '../components/Card';
import { Category } from '../lib/data';
import { NavBar } from '../components/NavBar';
import { usePosts } from '../components/usePosts';

type Props = {
  isMobile: boolean | null;
  categories: Category[];
  error: unknown;
};

export function Home({ isMobile, categories, error }: Props) {
  const { posts, handleViews, handleUpvote } = usePosts();
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
        {!isMobile && <NavBar categories={categories} />}
      </div>
      <div
        className={
          isMobile ? 'basis-full px-8 mt-12' : 'basis-full ml-52 mt-12 px-8'
        }>
        {posts.map((post) => (
          <Card
            key={post.postId}
            post={post}
            handleViews={() => handleViews(post)}
            handleUpvote={() => handleUpvote(post.postId)}
            handleDownvote={() => handleDownvote(post.postId)}
          />
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
