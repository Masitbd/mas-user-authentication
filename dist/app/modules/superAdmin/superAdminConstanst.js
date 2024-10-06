"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminUserConfig = exports.superAdminProfile = void 0;
const config_1 = __importDefault(require("../../../config"));
exports.superAdminProfile = {
    name: 'Super Admin',
    fatherName: 'Super Admin',
    motherName: 'Super Admin',
    phone: config_1.default.superAdmin.phone || '123456789',
    email: config_1.default.superAdmin.email || 'superadmin@gmail.com',
    address: 'Super Admin',
};
exports.superAdminUserConfig = {
    password: config_1.default.superAdmin.password || '123456789',
    role: 'super-admin',
};
