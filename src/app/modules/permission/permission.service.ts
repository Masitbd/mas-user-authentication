import { ENUM_USER_PEMISSION } from '../../../enums/user';
import { IGenericDecodedTokenData } from '../../../interfaces/common';
import { Permission } from './permission.model';
import { IPermission } from './permisson.interface';

const createPermission = async (params: IPermission) => {
  const result = await Permission.create(params);
  return result;
};

const fetchPermissions = async (user: IGenericDecodedTokenData) => {
  if (user?.permissions?.includes(ENUM_USER_PEMISSION.SUPER_ADMIN)) {
    const result = await Permission.find();
    return result;
  }
  if (user?.permissions?.includes(ENUM_USER_PEMISSION.ADMIN)) {
    const result = await Permission.find({
      code: { $ne: ENUM_USER_PEMISSION.SUPER_ADMIN },
    });

    return result;
  }

  const result = await Permission.find({
    code: {
      $nin: [ENUM_USER_PEMISSION.ADMIN, ENUM_USER_PEMISSION.SUPER_ADMIN],
    },
  });
  return result;
};
const fetchSingle = async (id: string) => {
  const result = await Permission.findById(id);
  return result;
};

const patchPermission = async (data: IPermission, id: string) => {
  const result = await Permission.findOneAndUpdate({ _id: id }, data);
  return result;
};

const deletePermission = async (id: string) => {
  const result = await Permission.findOneAndDelete({ _id: id });
  return result;
};
export const PermsisionService = {
  createPermission,
  fetchPermissions,
  fetchSingle,
  patchPermission,
  deletePermission,
};
