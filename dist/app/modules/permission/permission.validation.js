"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionValidation = void 0;
const zod_1 = require("zod");
const postValidaiton = zod_1.z.object({
    body: zod_1.z.object({
        label: zod_1.z.string({ required_error: 'Label is required' }),
        code: zod_1.z.number({ required_error: 'Code is required' }),
    }),
});
const patchValidaiton = zod_1.z.object({
    body: zod_1.z.object({
        label: zod_1.z.string({ required_error: 'Label is required' }).optional(),
        code: zod_1.z.number({ required_error: 'Code is required' }).optional(),
    }),
});
exports.PermissionValidation = { postValidaiton, patchValidaiton };
