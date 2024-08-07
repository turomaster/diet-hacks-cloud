import { PostForm } from '../components/PostForm';
import { Category } from '../lib/data';

type Props = {
  categories: Category[];
  isMobile: boolean | null;
};
export function CreatePost({ categories, isMobile }: Props) {
  return (
    <div
      className={
        isMobile
          ? 'flex justify-center rounded-md mx-10 mt-12 py-8 bg-accent-gray'
          : 'flex justify-center rounded-md mx-72 mt-12 py-8 bg-accent-gray'
      }>
      <PostForm isMobile={isMobile} categories={categories} />
    </div>
  );
}
