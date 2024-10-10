import express from 'express';
import { ENUM_USER_PEMISSION } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.USER
  ),
  AuthController.changePassword
);
router.post('/forgot-password', AuthController.forgotPass);

router.post('/reset-password', AuthController.resetPassword);

router.post(
  '/change-password-by-admin',
  validateRequest(AuthValidation.changePasswordBYAdmin),
  auth(ENUM_USER_PEMISSION.SUPER_ADMIN),
  AuthController.changePaswordByAdmin
);

export const AuthRoutes = router;
