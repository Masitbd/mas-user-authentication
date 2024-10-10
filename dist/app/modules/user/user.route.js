"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.POST_USER, user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.SUPER_ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
// For changing user password by super admin
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.GET_ALL_USER), user_controller_1.UserController.getAllUser);
router.patch('/:uuid', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.SUPER_ADMIN, user_1.ENUM_USER_PEMISSION.USER), user_controller_1.UserController.updateUser);
router.get('/:uuid', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.SUPER_ADMIN, user_1.ENUM_USER_PEMISSION.GET_ALL_USER), user_controller_1.UserController.getUserByUUid);
exports.UserRoutes = router;
