"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidator = void 0;
const zod_1 = require("zod");
const postValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        fatherName: zod_1.z.string({ required_error: 'Father Name is required' }),
        motherName: zod_1.z.string({ required_error: 'Mother Name is required' }),
        phone: zod_1.z.string({ required_error: 'Phone is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        address: zod_1.z.string({ required_error: 'Address is required' }),
        age: zod_1.z.string({ required_error: 'Age is required' }),
        dateOfBirth: zod_1.z.string({ required_error: 'Date of Birth is required' }),
        gender: zod_1.z.string({ required_error: 'Gender is required' }),
    }),
});
const patchVlaidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        fatherName: zod_1.z
            .string({ required_error: 'Father Name is required' })
            .optional(),
        motherName: zod_1.z
            .string({ required_error: 'Mother Name is required' })
            .optional(),
        phone: zod_1.z.string({ required_error: 'Phone is required' }).optional(),
        email: zod_1.z.string({ required_error: 'Email is required' }).optional(),
        address: zod_1.z.string({ required_error: 'Address is required' }).optional(),
        age: zod_1.z.string({ required_error: 'Age is required' }).optional(),
        dateOfBirth: zod_1.z
            .string({ required_error: 'Date of Birth is required' })
            .optional(),
        gender: zod_1.z.string({ required_error: 'Gender is required' }).optional(),
    }),
});
exports.ProfileValidator = {
    postValidation,
    patchVlaidation,
};
