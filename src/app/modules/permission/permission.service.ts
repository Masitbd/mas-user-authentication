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
export const PermsisionService = {
  createPermission,
  fetchPermissions,
  fetchSingle,
};
