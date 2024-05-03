import express from 'express';
import { ENUM_USER_PEMISSION } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { PermissionController } from './permission.controller';
const routes = express.Router();
routes.post(
  '/',
  auth(
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.MANAGE_PERMISSIONS
  ),
  PermissionController.createPermission
);
routes.get(
  '/',
  auth(
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.MANAGE_PERMISSIONS
  ),
  PermissionController.getAllPermission
);
routes.get(
  '/:id',
  auth(
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.MANAGE_PERMISSIONS
  ),
  PermissionController.getSinglelPermission
);
routes.patch(
  '/:id',
  auth(
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.MANAGE_PERMISSIONS
  ),
  PermissionController.updatePermission
);
routes.delete(
  '/:id',
  auth(
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.MANAGE_PERMISSIONS
  ),
  PermissionController.removePermission
);
export const PermissionRoutes = routes;
