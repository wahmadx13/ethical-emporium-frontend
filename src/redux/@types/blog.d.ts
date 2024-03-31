export interface IBlog {
  _id: Object;
  title: string;
  slug: string;
  description: string;
  category: string;
  numberOfViews: number;
  isLiked: boolean;
  isDisliked: boolean;
  likes: [];
  dislikes: [];
  tags: string[];
  images: {
    url: string;
    asset_id: string;
    public_id: string;
  }[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogSlice {
  blogs: IBlog[];
  singleBlog: IBlog;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}
