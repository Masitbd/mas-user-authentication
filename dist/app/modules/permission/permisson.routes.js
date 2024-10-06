"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const permission_controller_1 = require("./permission.controller");
const routes = express_1.default.Router();
routes.post('/', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.SUPER_ADMIN, user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.MANAGE_PERMISSIONS), permission_controller_1.PermissionController.createPermission);
routes.get('/', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.MANAGE_PERMISSIONS, user_1.ENUM_USER_PEMISSION.GET_PERMISSIONS, user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.SUPER_ADMIN), permission_controller_1.PermissionController.getAllPermission);
routes.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.MANAGE_PERMISSIONS, user_1.ENUM_USER_PEMISSION.GET_PERMISSIONS, user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.SUPER_ADMIN), permission_controller_1.PermissionController.getSinglelPermission);
routes.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.SUPER_ADMIN, user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.MANAGE_PERMISSIONS), permission_controller_1.PermissionController.updatePermission);
routes.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.SUPER_ADMIN, user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.MANAGE_PERMISSIONS), permission_controller_1.PermissionController.removePermission);
exports.PermissionRoutes = routes;
