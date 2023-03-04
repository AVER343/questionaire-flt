"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const config_2 = require("../../config");
const jwt_strategy_1 = require("../auth/strategy/jwt.strategy");
const current_user_middleware_1 = require("../common/middleware/current-user.middleware");
const prisma_service_1 = require("../prisma/prisma.service");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = UserModule_1 = class UserModule {
    configure(consumer) {
        consumer.apply(current_user_middleware_1.CurrentUserMiddleware).forRoutes('*');
    }
};
UserModule = UserModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    secret: config_2.JWT_COOKIE_SECRET,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [user_service_1.UserService, prisma_service_1.PrismaService, jwt_strategy_1.JwtStrategy],
        exports: [UserModule_1],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map