"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const mongoose_1 = require("mongoose");
const permissionSchema = new mongoose_1.Schema({
    label: { type: String, required: true },
    code: { type: Number, unique: true, required: true },
});
exports.Permission = (0, mongoose_1.model)('Permisson', permissionSchema);
