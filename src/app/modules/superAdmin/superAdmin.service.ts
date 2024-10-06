import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Profile } from '../profile/profile.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { generateUUid } from '../user/user.utils';
import { UserPermission } from '../userPermissions/userPermission.model';
import { superAdminProfile, superAdminUserConfig } from './superAdminConstanst';

const postSuperAdmin = async () => {
  const session = await mongoose.startSession();
  // Creating super admin
  // 1. Generating uuid

  try {
    session.startTransaction();
    const doesUserExists = await User.find({ role: 'super-admin' });
    if (doesUserExists.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Super Admin already exists');
    }

    // generate custom uuid
    const id = await generateUUid();

    // Setting custom id to profile
    const profileData = superAdminProfile;
    profileData.uuid = id;
    //creating profile
    const profile = await Profile.create([profileData], { session });
    if (!profile?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create profile');
    }

    //Permission Data  and creating permission
    const permissionData = { permissions: [1], uuid: id };
    const permission = await UserPermission.create([permissionData], {
      session,
    });
    if (!permission?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create profile');
    }

    //Crating user
    const userData: IUser = {
      needsPasswordChange: true,
      role: 'super-admin',
      password: superAdminUserConfig.password,
      uuid: id,
      profile: profile[0]._id,
      permissions: permission[0]._id,
    };

    const user = await User.create([userData], { session });

    if (!user?.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create Super admin'
      );
    }
    await session.commitTransaction();
    await session.endSession();

    return 'Super admin Cerated successfully';
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create super admin');
  }
};
export const SuperAdminService = { postSuperAdmin };
