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
exports.ProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const EnumStatus_1 = require("../../../constants/EnumStatus");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const profile_model_1 = require("./profile.model");
const fetchSIngleUserProfileData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
    if (((_a = result[0]) === null || _a === void 0 ? void 0 : _a.status) == EnumStatus_1.ENUM_STATUS.RUSTICATED) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Your acount has been rusticate');
    }
    return result;
});
const patchProfile = (uuid, profileData) => __awaiter(void 0, void 0, void 0, function* () {
    const doesUserExists = yield user_model_1.User.findOne({ uuid: uuid });
    if (!doesUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if ((profileData === null || profileData === void 0 ? void 0 : profileData.email) && (doesUserExists === null || doesUserExists === void 0 ? void 0 : doesUserExists.email)) {
        if (profileData.email !== (doesUserExists === null || doesUserExists === void 0 ? void 0 : doesUserExists.email)) {
            yield user_model_1.User.findOneAndUpdate({ uuid: uuid, email: profileData.email });
        }
    }
    const result = yield profile_model_1.Profile.findOneAndUpdate({ uuid: uuid }, profileData);
    return result;
});
exports.ProfileService = { fetchSIngleUserProfileData, patchProfile };
