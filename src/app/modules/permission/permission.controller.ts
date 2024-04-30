import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PermsisionService } from './permission.service';
import { IPermission } from './permisson.interface';

const createPermission: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PermsisionService.createPermission(req.body);

    sendResponse<IPermission>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Permission created successfully!',
      data: result,
    });
  }
);

export const PermissionController = { createPermission };
