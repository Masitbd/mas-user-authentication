import { IUserPermission } from './userPermission.interface';
import { UserPermission } from './userPermission.model';

const postUserPermission = async (params: number[]) => {
  const result = await UserPermission.create(params);
  return result;
};

const patchUserPermission = async (param: Partial<IUserPermission>) => {
  const result = await UserPermission.findOneAndUpdate(
    { uuid: param.uuid },
    param
  );
  return result;
};

export const UserPermissionService = {
  postUserPermission,
  patchUserPermission,
};
