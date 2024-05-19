import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { IGenericDecodedTokenData } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserPermissionService } from './userPermission.service';

const updateUserPermission: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserPermissionService.patchUserPermission(
      req.body,
      req.params.uuid,
      req.user as IGenericDecodedTokenData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Permission Updated successfully!',
      data: result,
    });
  }
);

export const UserPermissionController = { updateUserPermission };
