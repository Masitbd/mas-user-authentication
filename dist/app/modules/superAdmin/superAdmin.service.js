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
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const user_service_1 = require("../user/user.service");
const superAdminConstanst_1 = require("./superAdminConstanst");
const postSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const doesUserExists = yield user_model_1.User.find();
    if (doesUserExists.length > 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Super Admin already exists');
    }
    const newSuperAdmin = yield user_service_1.UserService.createUser(superAdminConstanst_1.superAdminProfile, superAdminConstanst_1.superAdminUserConfig);
    return newSuperAdmin;
});
exports.SuperAdminService = { postSuperAdmin };
