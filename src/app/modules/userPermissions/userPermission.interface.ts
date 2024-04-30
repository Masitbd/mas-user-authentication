import { Types } from 'mongoose';

export type IUserPermission = {
  _id?: Types.ObjectId;
  uuid: string;
  permissions: number[];
};
