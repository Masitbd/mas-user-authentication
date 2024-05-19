import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericDecodedTokenData } from '../../../interfaces/common';
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
const getAllPermission: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PermsisionService.fetchPermissions(
      req.user as IGenericDecodedTokenData
    );

    sendResponse<IPermission[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Permission featched successfully!',
      data: result,
    });
  }
);
const getSinglelPermission: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await PermsisionService.fetchSingle(id);

    sendResponse<IPermission>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Permission featched successfully!',
      data: result,
    });
  }
);

const updatePermission: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PermsisionService.patchPermission(
      req.body,
      req.params.id
    );
    sendResponse<IPermission>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Permission updated successfully!',
      data: result,
    });
  }
);

const removePermission: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PermsisionService.deletePermission(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Permission deleted successfully!',
      data: result,
    });
  }
);

export const PermissionController = {
  createPermission,
  getAllPermission,
  getSinglelPermission,
  updatePermission,
  removePermission,
};
