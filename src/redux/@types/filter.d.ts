import { IBlog } from "./blog";
import { IBrand } from "./brand";
import { IProductCategory } from "./productCategory";

export interface IFilterSlice {
  category: IProductCategory;
  brand: IBrand;
  blog: IBlog;
}
