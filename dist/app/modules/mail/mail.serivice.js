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
exports.func = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transpoert = nodemailer_1.default.createTransport({
    service: 'hotmail',
    host: 'smtp-mail.outlook.com',
    secure: false,
    port: 587,
    auth: {
        user: 'marufahmed9270@gmail.com',
        pass: 'igfpmhfejgssjrpi',
    },
    tls: {
        ciphers: 'SSLv3',
    },
});
const func = () => __awaiter(void 0, void 0, void 0, function* () {
    const mailData = yield transpoert.sendMail({
        from: 'Marufahmed9270@gmail.com',
        to: 'Maruf9270@gmail.com',
        subject: 'TEst mail',
        text: 'emailBody',
    });
    console.log(mailData);
});
exports.func = func;
