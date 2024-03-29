import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";

export interface IUser extends Partial<CognitoIdTokenPayload> {
  _id: Object;
  name: string;
  email: string;
  phoneNumber: string;
  role?: string;
  address: string;
  cognitoUserId?: string;
  isBlocked: boolean;
  cart?: {
    _id: Object;
    count: number;
    color: string;
    singleItemPrice?: number;
    totalPrice?: number;
  }[];
  cartTotal: number;
  totalAfterDiscount?: number;
  wishList: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthInitialState {
  user: IUser;
  username: string;
  jwtToken?: string;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
}
