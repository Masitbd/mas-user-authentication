import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { JwtPayload } from 'jsonwebtoken';
import { IGenericDecodedTokenData } from '../../../interfaces/common';
import { ProfileService } from './profile.service';

const getSingleUserProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProfileService.fetchSIngleUserProfileData(
      req.user as IGenericDecodedTokenData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile featched successfully!',
      data: result,
    });
  }
);
const updateProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProfileService.patchProfile(
      req.params.uuid,
      req.body,
      req.user as JwtPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  }
);

export const ProfileController = { getSingleUserProfile, updateProfile };
