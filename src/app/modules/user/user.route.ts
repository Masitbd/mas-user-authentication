import express from 'express';
import { ENUM_USER_PEMISSION } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/',
  auth(
    ENUM_USER_PEMISSION.POST_USER,
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN
  ),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

// For changing user password by super admin

router.get(
  '/',
  auth(ENUM_USER_PEMISSION.GET_ALL_USER),
  UserController.getAllUser
);

router.patch(
  '/:uuid',
  auth(
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.USER
  ),
  UserController.updateUser
);

router.get(
  '/:uuid',
  auth(
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.GET_ALL_USER
  ),
  UserController.getUserByUUid
);
export const UserRoutes = router;
