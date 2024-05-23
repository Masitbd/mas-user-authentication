import express from 'express';
import { ENUM_USER_PEMISSION } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileController } from './profile.controller';
import { ProfileValidator } from './profileValidation';
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
router.patch(
  '/:uuid',
  auth(
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.USER
  ),
  validateRequest(ProfileValidator.patchVlaidation),
  ProfileController.updateProfile
);

export const ProfileRoutes = router;
