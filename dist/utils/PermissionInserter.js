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
exports.permissionInserter = void 0;
const permission_model_1 = require("../app/modules/permission/permission.model");
const PermisssionObject_1 = require("../constants/PermisssionObject");
const LoadingAnimation_1 = require("./LoadingAnimation");
const permissionInserter = () => __awaiter(void 0, void 0, void 0, function* () {
    const PermissionSpinner = (0, LoadingAnimation_1.startSpinner)('Checking for permission and inserting the permissions');
    const permissions = PermisssionObject_1.permissionData;
    if (!permissions)
        return;
    const permissionPromises = permissions.map((p) => __awaiter(void 0, void 0, void 0, function* () {
        const doesExists = yield permission_model_1.Permission.exists({ code: p.code });
        if (!doesExists) {
            yield permission_model_1.Permission.create(p);
        }
    }));
    yield Promise.all(permissionPromises);
    PermissionSpinner();
    console.log('\u{2705} Permission inserted successfully');
});
exports.permissionInserter = permissionInserter;
