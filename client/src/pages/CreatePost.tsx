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
          ? 'flex justify-center mx-10 py-8'
          : 'flex justify-center mx-72 py-8'
      }>
      <PostForm isMobile={isMobile} categories={categories} />
    </div>
  );
}
