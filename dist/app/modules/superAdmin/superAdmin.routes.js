"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const superAdmin_controller_1 = require("./superAdmin.controller");
const routes = express_1.default.Router();
routes.get('/', superAdmin_controller_1.superAdminController.createSuperAdmin);
exports.SuperAdminRoutes = { routes };
