"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermission = void 0;
const mongoose_1 = require("mongoose");
const userPermissionSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
    },
    permissions: [Number],
});
exports.UserPermission = (0, mongoose_1.model)('UserPermission', userPermissionSchema);
