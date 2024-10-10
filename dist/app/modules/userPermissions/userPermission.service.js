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
exports.UserPermissionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const userPermission_model_1 = require("./userPermission.model");
const postUserPermission = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userPermission_model_1.UserPermission.create(params);
    return result;
});
const patchUserPermission = (param, uuid, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (((_a = param.permissions) === null || _a === void 0 ? void 0 : _a.includes(user_1.ENUM_USER_PEMISSION.SUPER_ADMIN)) &&
        !user.permissions.includes(user_1.ENUM_USER_PEMISSION.SUPER_ADMIN)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    if (((_b = param.permissions) === null || _b === void 0 ? void 0 : _b.includes(user_1.ENUM_USER_PEMISSION.ADMIN)) &&
        !user.permissions.includes(user_1.ENUM_USER_PEMISSION.SUPER_ADMIN || user_1.ENUM_USER_PEMISSION.SUPER_ADMIN)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    const result = yield userPermission_model_1.UserPermission.findOneAndUpdate({ uuid: uuid }, param);
    return result;
});
exports.UserPermissionService = {
    postUserPermission,
    patchUserPermission,
};
