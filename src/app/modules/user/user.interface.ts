/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IProfile } from '../profile/profile.interface';
import { IUserPermission } from '../userPermissions/userPermission.interface';

export type IUser = {
  uuid: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  profile?: Types.ObjectId | IProfile;
  permissions?: Types.ObjectId | IUserPermission;
  status: string;
};

export type IUserResponse = {
  uuid: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  profile?: IProfile;
  permissions?: IUserPermission;
  status: string;
};
export type UserModel = {
  isUserExist(
    uuid: string
  ): Promise<
    Pick<
      IUser,
      'uuid' | 'password' | 'role' | 'needsPasswordChange' | 'permissions'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
