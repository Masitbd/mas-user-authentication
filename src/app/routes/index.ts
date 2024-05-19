import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

import { PermissionRoutes } from '../modules/permission/permisson.routes';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { UserRoutes } from '../modules/user/user.route';
import { UserPermissionRoutes } from '../modules/userPermissions/userPermission.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/permission',
    route: PermissionRoutes,
  },
  {
    path: '/userPermission',
    route: UserPermissionRoutes.router,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
