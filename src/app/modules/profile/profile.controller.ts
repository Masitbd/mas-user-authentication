import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

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
      message: 'User created successfully!',
      data: result,
    });
  }
);

export const ProfileController = { getSingleUserProfile };
