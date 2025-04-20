import { ENUM_USER_PEMISSION } from '../../../enums/user';

export type ILoginUser = {
  uuid?: string;
  password: string;
  email: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_PEMISSION;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
