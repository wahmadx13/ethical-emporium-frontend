import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";

export interface IAuthInitialState {
  user: CognitoIdTokenPayload;
  jwtToken?: string;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: unknown;
}
