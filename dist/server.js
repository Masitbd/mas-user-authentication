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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const superAdmin_service_1 = require("./app/modules/superAdmin/superAdmin.service");
const user_model_1 = require("./app/modules/user/user.model");
const index_1 = __importDefault(require("./config/index"));
const LoadingAnimation_1 = require("./utils/LoadingAnimation");
const PermissionInserter_1 = require("./utils/PermissionInserter");
process.on('uncaughtException', error => {
    // errorlogger.error(error);
    console.log(error);
    process.exit(1);
});
let server;
function mainFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await RedisClient.connect().then(() => {
            //   subscribeToEvents();
            // });
            yield mongoose_1.default.connect(index_1.default.database_url);
            // logger.info(`🛢   Database is connected successfully`);
            console.log(`\u{2705} 🛢   Database is connected successfully`);
            server = app_1.default.listen(index_1.default.port, () => {
                // logger.info(`Application  listening on port ${config.port}`);
                console.log(` \u{2705} Application  listening on port ${index_1.default.port}`);
            });
            // Permission Inserter
            yield (0, PermissionInserter_1.permissionInserter)()
                .then()
                .catch(err => console.log(err));
            // Checking if super admin exists and creating super admin
            const spinnerStopper = (0, LoadingAnimation_1.startSpinner)('Checking For Super Admin');
            const doesUserExists = yield user_model_1.User.find({ role: 'super-admin' });
            if (doesUserExists.length == 0) {
                yield superAdmin_service_1.SuperAdminService.postSuperAdmin();
                spinnerStopper();
                console.log(' \u{2705} Super Admin created successfully');
            }
            else {
                spinnerStopper();
                console.log('\u{274C} Super Admin exists. Not Inserting New');
            }
        }
        catch (err) {
            // errorlogger.error('Failed to connect database', err);
            console.log(err);
        }
        process.on('unhandledRejection', error => {
            if (server) {
                server.close(() => {
                    // errorlogger.error(error);
                    console.log(error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
mainFunction();
