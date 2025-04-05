import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_STATUS } from '../../../constants/EnumStatus';
import { ENUM_USER_PEMISSION } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Profile } from '../profile/profile.model';
import { IUserResponse } from '../user/user.interface';
import { User } from '../user/user.model';
import { UserPermission } from '../userPermissions/userPermission.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { sendEmail } from './sendResetMail';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { uuid, password } = payload;
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(uuid);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const {
    uuid: userId,
    role,
    needsPasswordChange,
    permissions,
    status,
  } = isUserExist as IUserResponse;

  // checking is the user is rusticate
  if (permissions && !permissions?.permissions.length) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Your account has been rusticated. Please contact administrator'
    );
  }
  if (status == ENUM_STATUS.RUSTICATED) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Your account has been rusticated. Please contact administrator'
    );
  }

  const accessToken = jwtHelpers.createToken(
    { uuid: userId, role, permissions: permissions?.permissions },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role, permissions },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      uuid: isUserExist.uuid,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const storedUser = await User.find({ uuid: user?.uuid }).select('+password');

  const isUserExist = storedUser?.length ? storedUser[0] : undefined;

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // data update
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};

const forgotPass = async (payload: { uuid: string }) => {
  const user = await User.findOne({ uuid: payload.uuid }, { uuid: 1, role: 1 });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }

  const profile = await Profile.findOne({ uuid: payload.uuid });

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile not found!');
  }

  const passResetToken = await jwtHelpers.createResetToken(
    { uuid: user.uuid },
    config.jwt.secret as string,
    '50m'
  );

  const resetLink: string = config.resetlink + '/' + `${passResetToken}`;

  if (!profile?.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!');
  }

  await sendEmail(
    profile?.email,
    `
      <div>
        <p>Hi, ${profile.name}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `
  );

  return {
    message:
      'A Password reset link Has been sent to you Email. Check your email! Also check spam',
  };
};

const resetPassword = async (payload: {
  newPassword: string;
  token: string;
}) => {
  const { newPassword, token } = payload;
  const isVarified = await jwtHelpers.verifyToken(
    token,
    config.jwt.secret as string
  );
  const user = await User.findOne({ uuid: isVarified?.uuid }, { id: 1 });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  const password = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  await User.updateOne({ uuid: isVarified?.uuid }, { password });
};

const changePasswordBySuperAdmin = async (
  user: JwtPayload | null,
  payload: { id: string; password: string }
) => {
  if (!user?.permissions?.includes(ENUM_USER_PEMISSION.SUPER_ADMIN)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to change the user password'
    );
  }

  const isUserExist = await User.findOne({
    uuid: payload.id,
  }).select('+password');

  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // data update
  isUserExist.password = payload.password;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};

const rusticateUser = async (payload: string) => {
  if (!payload) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user id');
  }

  const doesUserExists = await User.findOne({ _id: payload });
  if (!doesUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const userPermissions = await UserPermission.findOne({
    uuid: doesUserExists?.uuid,
  });

  if (!userPermissions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User permissions not found');
  }

  if (
    userPermissions.permissions.length &&
    userPermissions.permissions.includes(ENUM_USER_PEMISSION.SUPER_ADMIN)
  ) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Super admin cannot be rusticated'
    );
  }

  doesUserExists.status = ENUM_STATUS.RUSTICATED;
  const result = await User.findOneAndUpdate(
    {
      uuid: doesUserExists?.uuid,
    },
    { status: ENUM_STATUS.RUSTICATED }
  );

  return 'User Has been successfully rusticated';
};

const makeUserActive = async (payload: string) => {
  if (!payload) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user id');
  }

  const doesUserExists = await User.findOne({ _id: payload });
  if (!doesUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const userPermissions = await UserPermission.findOne({
    uuid: doesUserExists?.uuid,
  });

  if (!userPermissions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User permissions not found');
  }

  if (
    userPermissions.permissions.length &&
    userPermissions.permissions.includes(ENUM_USER_PEMISSION.SUPER_ADMIN)
  ) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Super admin status cannot be changed'
    );
  }

  doesUserExists.status = ENUM_STATUS.RUSTICATED;
  const result = await User.findOneAndUpdate(
    {
      uuid: doesUserExists?.uuid,
    },
    { status: ENUM_STATUS.ACTIVE }
  );

  return 'User Has been successfully Activated';
};
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPass,
  resetPassword,
  changePasswordBySuperAdmin,
  rusticateUser,
  makeUserActive,
};
