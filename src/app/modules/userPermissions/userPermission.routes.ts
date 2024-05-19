import express from 'express';
import { ENUM_USER_PEMISSION } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserPermissionController } from './userPermission.controller';
import { userPermissionZodSchema } from './userPermission.validator';

const router = express.Router();
router.patch(
  '/:uuid',
  validateRequest(userPermissionZodSchema),
  auth(
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.MANAGE_USER_PERMISSIONS
  ),
  UserPermissionController.updateUserPermission
);

export const UserPermissionRoutes = { router };
