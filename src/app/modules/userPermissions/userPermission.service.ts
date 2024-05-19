import httpStatus from 'http-status';
import { ENUM_USER_PEMISSION } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUserPermission } from './userPermission.interface';
import { UserPermission } from './userPermission.model';
import { IGenericDecodedTokenData } from '../../../interfaces/common';

const postUserPermission = async (params: number[]) => {
  const result = await UserPermission.create(params);
  return result;
};

const patchUserPermission = async (
  param: Partial<IUserPermission>,
  uuid: string,
  user: IGenericDecodedTokenData
) => {
  if (
    param.permissions?.includes(ENUM_USER_PEMISSION.SUPER_ADMIN) &&
    !user.permissions.includes(ENUM_USER_PEMISSION.SUPER_ADMIN)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  if (
    param.permissions?.includes(ENUM_USER_PEMISSION.ADMIN) &&
    !user.permissions.includes(
      ENUM_USER_PEMISSION.SUPER_ADMIN || ENUM_USER_PEMISSION.SUPER_ADMIN
    )
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  const result = await UserPermission.findOneAndUpdate({ uuid: uuid }, param);
  return result;
};

export const UserPermissionService = {
  postUserPermission,
  patchUserPermission,
};
