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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const user_model_1 = require("../user/user.model");
const profile_model_1 = require("./profile.model");
const fetchSIngleUserProfileData = (data) => __awaiter(void 0, void 0, void 0, function* () {
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
const patchProfile = (uuid, profileData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.findOneAndUpdate({ uuid: uuid }, profileData);
    return result;
});
exports.ProfileService = { fetchSIngleUserProfileData, patchProfile };
