export interface IProduct {
  _id: Object;
  title: string;
  slug: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  quantity: number;
  sold: number;
  color: string[];
  tags: string[];
  numberOfUsersRated: number;
  totalRating: number;
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  ratings: [];
  images: {
    url: string;
    public_id: string;
    asset_id: string;
  }[];
}

export interface IProductSlice {
  products: IProduct[];
  singleProduct: IProduct;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}
