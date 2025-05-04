import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ENUM_STATUS } from '../../../constants/EnumStatus';
import ApiError from '../../../errors/ApiError';
import { IGenericDecodedTokenData } from '../../../interfaces/common';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IProfile } from './profile.interface';
import { Profile } from './profile.model';

const fetchSIngleUserProfileData = async (data: IGenericDecodedTokenData) => {
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

  if (result[0]?.status == ENUM_STATUS.RUSTICATED) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your acount has been rusticate');
  }
  return result;
};

const patchProfile = async (
  uuid: string,
  profileData: IProfile & { role: string },
  user: JwtPayload
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const doesUserExists = await User.findOne({ uuid: uuid });
    if (!doesUserExists) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (profileData?.email && doesUserExists?.email) {
      if (profileData.email !== doesUserExists?.email) {
        await User.findOneAndUpdate({ uuid: uuid, email: profileData.email });
      }
    }

    const updatableUserData: Partial<IUser> = {};

    // setting the role
    if (profileData?.role !== doesUserExists?.role) {
      if (profileData?.role == 'super-admin' || profileData?.role == 'admin') {
        if (user?.role !== 'super-admin') {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized to update the role to admin'
          );
        } else {
          updatableUserData.role = profileData?.role;
        }
      } else if (user?.role !== 'admin' && user?.role !== 'super-admin') {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to update the role'
        );
      } else {
        updatableUserData.role = profileData?.role;
      }
    }

    // setting the email
    if (profileData?.email && profileData?.email !== doesUserExists?.email) {
      updatableUserData.email = profileData?.email;
    }

    // saving the data
    if (updatableUserData) {
      await User.findOneAndUpdate({ uuid: uuid }, updatableUserData, {
        session,
      });
    }
    const result = await Profile.findOneAndUpdate({ uuid: uuid }, profileData, {
      session,
    });
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session?.abortTransaction();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error as string);
  } finally {
    await session.endSession();
  }
};
export const ProfileService = { fetchSIngleUserProfileData, patchProfile };
