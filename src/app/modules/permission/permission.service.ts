import { Permission } from './permission.model';
import { IPermission } from './permisson.interface';

const createPermission = async (params: IPermission) => {
  const result = await Permission.create(params);
  return result;
};

const fetchPermissions = async () => {
  const result = await Permission.find();
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
