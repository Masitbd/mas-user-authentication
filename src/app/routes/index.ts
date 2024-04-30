import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

import { PermissionRoutes } from '../modules/permission/permisson.routes';
import { UserRoutes } from '../modules/user/user.route';

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
    path: '/permisson',
    route: PermissionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
