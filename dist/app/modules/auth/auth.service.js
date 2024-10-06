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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const profile_model_1 = require("../profile/profile.model");
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid, password } = payload;
    // creating instance of User
    // const user = new User();
    //  // access to our instance methods
    //   const isUserExist = await user.isUserExist(id);
    const isUserExist = yield user_model_1.User.isUserExist(uuid);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { uuid: userId, role, needsPasswordChange, permissions, } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ uuid: userId, role, permissions: permissions === null || permissions === void 0 ? void 0 : permissions.permissions }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, permissions }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        uuid: isUserExist.uuid,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield user_model_1.User.findOne({ id: user === null || user === void 0 ? void 0 : user.userId }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    // // hash password before saving
    // const newHashedPassword = await bcrypt.hash(
    //   newPassword,
    //   Number(config.bycrypt_salt_rounds)
    // );
    // const query = { id: user?.userId };
    // const updatedData = {
    //   password: newHashedPassword,  //
    //   needsPasswordChange: false,
    //   passwordChangedAt: new Date(), //
    // };
    // await User.findOneAndUpdate(query, updatedData);
    // data update
    isUserExist.password = newPassword;
    isUserExist.needsPasswordChange = false;
    // updating using save()
    isUserExist.save();
});
const forgotPass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ uuid: payload.uuid }, { uuid: 1, role: 1 });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist!');
    }
    const profile = profile_model_1.Profile.findOne({ uuid: payload.uuid });
    if (!profile) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Pofile not found!');
    }
    const passResetToken = yield jwtHelpers_1.jwtHelpers.createResetToken({ id: user.id }, config_1.default.jwt.secret, '50m');
    const resetLink = config_1.default.resetlink + `token=${passResetToken}`;
    // await sendEmail(
    //   profile?.email,
    //   `
    //     <div>
    //       <p>Hi, ${profile.name}</p>
    //       <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
    //       <p>Thank you</p>
    //     </div>
    // `
    // );
    // return {
    //   message: "Check your email!"
    // }
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newPassword } = payload;
    const user = yield user_model_1.User.findOne({ id }, { id: 1 });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found!');
    }
    const isVarified = yield jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const password = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    yield user_model_1.User.updateOne({ id }, { password });
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPass,
    resetPassword,
};
