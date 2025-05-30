"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        uuid: zod_1.z
            .string({
            required_error: 'ID is required',
        })
            .optional(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password  is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password  is required',
        }),
    }),
});
const changePasswordBYAdmin = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'id is required',
        }),
        password: zod_1.z.string({
            required_error: ' password  is required',
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema,
    changePasswordBYAdmin,
};
