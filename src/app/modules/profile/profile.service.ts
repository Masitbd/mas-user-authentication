import httpStatus from 'http-status';
import { ENUM_STATUS } from '../../../constants/EnumStatus';
import ApiError from '../../../errors/ApiError';
import { IGenericDecodedTokenData } from '../../../interfaces/common';
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

const patchProfile = async (uuid: string, profileData: IProfile) => {
  const result = await Profile.findOneAndUpdate({ uuid: uuid }, profileData);
  return result;
};
export const ProfileService = { fetchSIngleUserProfileData, patchProfile };
