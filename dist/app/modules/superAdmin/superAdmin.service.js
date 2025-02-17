"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const profile_model_1 = require("../profile/profile.model");
const user_model_1 = require("../user/user.model");
const user_utils_1 = require("../user/user.utils");
const userPermission_model_1 = require("../userPermissions/userPermission.model");
const superAdminConstanst_1 = require("./superAdminConstanst");
const postSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    // Creating super admin
    // 1. Generating uuid
    try {
        session.startTransaction();
        const doesUserExists = yield user_model_1.User.find({ role: 'super-admin' });
        if (doesUserExists.length > 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Super Admin already exists');
        }
        // generate custom uuid
        const id = yield (0, user_utils_1.generateUUid)();
        // Setting custom id to profile
        const profileData = superAdminConstanst_1.superAdminProfile;
        profileData.uuid = id;
        //creating profile
        const profile = yield profile_model_1.Profile.create([profileData], { session });
        if (!(profile === null || profile === void 0 ? void 0 : profile.length)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create profile');
        }
        //Permission Data  and creating permission
        const permissionData = { permissions: [1], uuid: id };
        const permission = yield userPermission_model_1.UserPermission.create([permissionData], {
            session,
        });
        if (!(permission === null || permission === void 0 ? void 0 : permission.length)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create profile');
        }
        //Crating user
        const userData = {
            needsPasswordChange: true,
            role: 'super-admin',
            password: superAdminConstanst_1.superAdminUserConfig.password,
            uuid: id,
            profile: profile[0]._id,
            permissions: permission[0]._id,
            status: 'active',
        };
        const user = yield user_model_1.User.create([userData], { session });
        if (!(user === null || user === void 0 ? void 0 : user.length)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Super admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return 'Super admin Cerated successfully';
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create super admin');
    }
});
exports.SuperAdminService = { postSuperAdmin };
