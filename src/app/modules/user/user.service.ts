import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IProfile } from '../profile/profile.interface';
import { Profile } from '../profile/profile.model';
import { UserPermission } from '../userPermissions/userPermission.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUUid } from './user.utils';

const createUser = async (
  profile: IProfile,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate custom uuid
    const id = await generateUUid();
    // set custom id
    user.uuid = id;
    profile.uuid = id;

    const permissionData = { permissions: [3], uuid: id };
    if (user.role == 'super-admin') {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not allowed to create super Admin'
      );
    }

    const userPermission = await UserPermission.create([permissionData], {
      session,
    });
    if (!userPermission.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    user.permissions = userPermission[0]._id;

    // Create profile using sesssin
    const newProfile = await Profile.create([profile], { session });

    if (!newProfile.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create profile');
    }

    user.profile = newProfile[0]._id;

    // Creating new user using sesssin
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'profile',
      populate: [
        {
          path: 'permissions',
        },
      ],
    });
  }

  return newUserAllData;
};

const getSIngleUser = async (data: Partial<IUser>) => {
  const result = await User.aggregate([
    {
      $match: {
        uuid: data.uuid,
      },
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'uuid',
        foreignField: 'uuid',
        as: 'profile',
      },
    },
    {
      $unwind: {
        path: '$profile',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'userpermissions',
        localField: 'uuid',
        foreignField: 'uuid',
        as: 'permissions',
      },
    },
    {
      $unwind: {
        path: '$permissions',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        password: 0,
      },
    },
  ]);

  return result;
};

const getALluser = async () => {
  const result = await Profile.aggregate([
    {
      $lookup: {
        from: 'userpermissions',
        localField: 'uuid',
        foreignField: 'uuid',
        as: 'permissions',
      },
    },
    {
      $unwind: {
        path: '$permissions',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  return result;
};

const patchUser = async (uuid: string, data: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ uuid: uuid }, data);
  return result;
};

export const UserService = {
  createUser,
  getSIngleUser,
  getALluser,
  patchUser,
};
