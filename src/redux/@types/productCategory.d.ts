interface IProductCategory {
  _id: Object;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductCategorySlice {
  categories: IProductCategory[];
  singleCategory: IProductCategory;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}
