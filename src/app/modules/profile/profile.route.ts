import express from 'express';
import { ENUM_USER_PEMISSION } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.USER
  ),
  ProfileController.getSingleUserProfile
);

export const ProfileRoutes = router;
