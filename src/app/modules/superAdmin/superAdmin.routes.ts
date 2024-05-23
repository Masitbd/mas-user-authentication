import express from 'express';
import { superAdminController } from './superAdmin.controller';
const routes = express.Router();
routes.get('/', superAdminController.createSuperAdmin);

export const SuperAdminRoutes = { routes };
