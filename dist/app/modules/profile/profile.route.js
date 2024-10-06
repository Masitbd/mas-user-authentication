"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const profile_controller_1 = require("./profile.controller");
const profileValidation_1 = require("./profileValidation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.SUPER_ADMIN, user_1.ENUM_USER_PEMISSION.USER), profile_controller_1.ProfileController.getSingleUserProfile);
router.patch('/:uuid', (0, auth_1.default)(user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.SUPER_ADMIN, user_1.ENUM_USER_PEMISSION.USER), (0, validateRequest_1.default)(profileValidation_1.ProfileValidator.patchVlaidation), profile_controller_1.ProfileController.updateProfile);
exports.ProfileRoutes = router;
