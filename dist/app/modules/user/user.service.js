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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../../../config/index"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const profile_model_1 = require("../profile/profile.model");
const userPermission_model_1 = require("../userPermissions/userPermission.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createUser = (profile, user) => __awaiter(void 0, void 0, void 0, function* () {
    // If password is not given,set default password
    if (!user.password) {
        user.password = index_1.default.default_user_pass;
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // generate custom uuid
        const id = yield (0, user_utils_1.generateUUid)();
        // set custom id
        user.uuid = id;
        profile.uuid = id;
        const permissionData = { permissions: [3], uuid: id };
        if (user.role == 'super-admin') {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not allowed to create super Admin');
        }
        const userPermission = yield userPermission_model_1.UserPermission.create([permissionData], {
            session,
        });
        if (!userPermission.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        user.permissions = userPermission[0]._id;
        // Create profile using sesssin
        const newProfile = yield profile_model_1.Profile.create([profile], { session });
        if (!newProfile.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create profile');
        }
        user.profile = newProfile[0]._id;
        // Creating new user using sesssin
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'profile',
            populate: [
                {
                    path: 'permissions',
                },
            ],
        });
    }
    return newUserAllData;
});
const getSIngleUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        {
            $match: {
                uuid: data.uuid,
            },
        },
        {
            $lookup: {
                from: 'profiles',
                localField: 'uuid',
                foreignField: 'uuid',
                as: 'profile',
            },
        },
        {
            $unwind: {
                path: '$profile',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'userpermissions',
                localField: 'uuid',
                foreignField: 'uuid',
                as: 'permissions',
            },
        },
        {
            $unwind: {
                path: '$permissions',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                password: 0,
            },
        },
    ]);
    return result;
});
const getALluser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.aggregate([
        {
            $lookup: {
                from: 'userpermissions',
                localField: 'uuid',
                foreignField: 'uuid',
                as: 'permissions',
            },
        },
        {
            $unwind: {
                path: '$permissions',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'uuid',
                foreignField: 'uuid',
                as: 'user',
            },
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                'user.password': 0,
                'user.permissions': 0,
            },
        },
    ]);
    return result;
});
const patchUser = (uuid, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ uuid: uuid }, data);
    return result;
});
exports.UserService = {
    createUser,
    getSIngleUser,
    getALluser,
    patchUser,
};
