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
exports.PermsisionService = void 0;
const user_1 = require("../../../enums/user");
const permission_model_1 = require("./permission.model");
const createPermission = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield permission_model_1.Permission.create(params);
    return result;
});
const fetchPermissions = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((_a = user === null || user === void 0 ? void 0 : user.permissions) === null || _a === void 0 ? void 0 : _a.includes(user_1.ENUM_USER_PEMISSION.SUPER_ADMIN)) {
        const result = yield permission_model_1.Permission.find();
        return result;
    }
    if ((_b = user === null || user === void 0 ? void 0 : user.permissions) === null || _b === void 0 ? void 0 : _b.includes(user_1.ENUM_USER_PEMISSION.ADMIN)) {
        const result = yield permission_model_1.Permission.find({
            code: { $ne: user_1.ENUM_USER_PEMISSION.SUPER_ADMIN },
        });
        return result;
    }
    const result = yield permission_model_1.Permission.find({
        code: {
            $nin: [user_1.ENUM_USER_PEMISSION.ADMIN, user_1.ENUM_USER_PEMISSION.SUPER_ADMIN],
        },
    });
    return result;
});
const fetchSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield permission_model_1.Permission.findById(id);
    return result;
});
const patchPermission = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield permission_model_1.Permission.findOneAndUpdate({ _id: id }, data);
    return result;
});
const deletePermission = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield permission_model_1.Permission.findOneAndDelete({ _id: id });
    return result;
});
exports.PermsisionService = {
    createPermission,
    fetchPermissions,
    fetchSingle,
    patchPermission,
    deletePermission,
};
