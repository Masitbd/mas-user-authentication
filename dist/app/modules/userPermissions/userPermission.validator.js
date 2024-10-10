"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPermissionZodSchema = void 0;
const zod_1 = require("zod");
exports.userPermissionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        permissions: zod_1.z.array(zod_1.z.number({ required_error: 'This is required' })),
    }),
});
