import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SuperAdminService } from './superAdmin.service';

export const createSuperAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SuperAdminService.postSuperAdmin();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Super Admin created successfully!',
      data: result,
    });
  }
);

export const superAdminController = { createSuperAdmin };
