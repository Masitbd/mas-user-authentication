"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        profile: zod_1.z.object({
            name: zod_1.z.string({
                required_error: 'Name is required',
            }),
            fatherName: zod_1.z.string({
                required_error: 'Fatehr Name is required',
            }),
            motherName: zod_1.z.string({
                required_error: 'Mother  Name is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email(),
            phone: zod_1.z.string({
                required_error: 'phone number is required',
            }),
            address: zod_1.z.string({
                required_error: 'Address is required',
            }),
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
