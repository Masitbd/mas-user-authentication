"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    uuid: { type: String, required: true, unique: true },
    age: { type: String },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Profile = (0, mongoose_1.model)('Profile', profileSchema);
