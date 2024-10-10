"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userPermission_controller_1 = require("./userPermission.controller");
const userPermission_validator_1 = require("./userPermission.validator");
const router = express_1.default.Router();
router.patch('/:uuid', (0, validateRequest_1.default)(userPermission_validator_1.userPermissionZodSchema), (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.SUPER_ADMIN, user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.MANAGE_USER_PERMISSIONS), userPermission_controller_1.UserPermissionController.updateUserPermission);
exports.UserPermissionRoutes = { router };
