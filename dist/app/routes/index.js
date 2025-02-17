"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const permisson_routes_1 = require("../modules/permission/permisson.routes");
const profile_route_1 = require("../modules/profile/profile.route");
const user_route_1 = require("../modules/user/user.route");
const userPermission_routes_1 = require("../modules/userPermissions/userPermission.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/permission',
        route: permisson_routes_1.PermissionRoutes,
    },
    {
        path: '/userPermission',
        route: userPermission_routes_1.UserPermissionRoutes.router,
    },
    {
        path: '/profile',
        route: profile_route_1.ProfileRoutes,
    },
    // {
    //   path: '/superAdmin',
    //   route: SuperAdminRoutes.routes,
    // },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
