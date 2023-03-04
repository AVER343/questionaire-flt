"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const config_1 = require("@nestjs/config");
const config_2 = require("../../config");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const bull_1 = require("@nestjs/bull");
const message_producer_service_1 = require("../communication/email/message.producer.service");
const current_user_middleware_1 = require("../common/middleware/current-user.middleware");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(current_user_middleware_1.CurrentUserMiddleware).forRoutes('*');
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [
            message_producer_service_1.MailingProducerService,
            auth_service_1.AuthService,
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            jwt_strategy_1.JwtStrategy,
        ],
        imports: [
            bull_1.BullModule.registerQueue({
                name: config_2.QUEUES.SEND_EMAIL,
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    secret: config_2.JWT_COOKIE_SECRET,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map