"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_user_pass: process.env.DEFAULT_USER_PASS,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    superAdmin: {
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        phone: process.env.SUPER_ADMIN_PHONE,
        age: process.env.SUPER_ADMIN_AGE,
        dateOfBirth: process.env.SUPER_ADMIN_DATE_OF_BIRTH,
        gender: process.env.SUPER_ADMIN_GENDER,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    redis: {
        url: process.env.REDIS_URL,
        expires_in: process.env.REDIS_TOKEN_EXPIRES_IN,
    },
    resetlink: process.env.RESET_PASS_UI_LINK,
    email: process.env.EMAIL,
    appPass: process.env.APP_PASS,
};
