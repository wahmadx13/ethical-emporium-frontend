export interface IBrand {
  _id: Object;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrandSlice {
  brands: IBrand[];
  singleBrand: IBrand;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}
