"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const UserSchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
    },
    permissions: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserPermission',
    },
    status: {
        type: String,
        default: 'active',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
UserSchema.statics.isUserExist = function (uuid, email) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email && uuid) {
            return yield exports.User.findOne({ uuid: uuid }, {
                uuid: 1,
                password: 1,
                role: 1,
                needsPasswordChange: 1,
                permissions: 1,
                status: 1,
            }).populate('permissions');
        }
        if (email) {
            return yield exports.User.findOne({ email: email }, {
                uuid: 1,
                password: 1,
                role: 1,
                needsPasswordChange: 1,
                permissions: 1,
                status: 1,
            }).populate('permissions');
        }
        else
            return null;
    });
};
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
UserSchema.methods.changedPasswordAfterJwtIssued = function (jwtTimestamp) {
    console.log({ jwtTimestamp }, 'hi');
};
// User.create() / user.save()
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing user password
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_salt_rounds));
        if (!user.needsPasswordChange) {
            user.passwordChangedAt = new Date();
        }
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
// UserSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   return await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   );
// };
// UserSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };
