export type Post = {
  id: number;
  title: string;
  calories: number;
  body: string;
  userId: number;
  categoryId: number;
  totalVotes: number;
  views: number;
};

export type Comment = {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
};

export type Category = {
  id: number;
  name: string;
};
