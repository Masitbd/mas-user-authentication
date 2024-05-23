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

  return result;
};

const patchProfile = async (uuid: string, profileData: IProfile) => {
  const result = await Profile.findOneAndUpdate({ uuid: uuid }, profileData);
  return result;
};
export const ProfileService = { fetchSIngleUserProfileData, patchProfile };
