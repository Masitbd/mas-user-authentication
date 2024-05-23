import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { superAdminProfile, superAdminUserConfig } from './superAdminConstanst';

const postSuperAdmin = async () => {
  const doesUserExists = await User.find();
  if (doesUserExists.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Super Admin already exists');
  }
  const newSuperAdmin = await UserService.createUser(
    superAdminProfile,
    superAdminUserConfig as IUser
  );
  return newSuperAdmin;
};
export const SuperAdminService = { postSuperAdmin };
