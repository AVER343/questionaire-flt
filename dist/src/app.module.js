"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const buyer_module_1 = require("./roles/buyer/buyer.module");
const seller_module_1 = require("./roles/seller/seller.module");
const admin_module_1 = require("./roles/admin/admin.module");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const bull_1 = require("@nestjs/bull");
const config_1 = require("../config");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const email_module_1 = require("./communication/email/email.module");
const config_2 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            buyer_module_1.BuyerModule,
            seller_module_1.SellerModule,
            admin_module_1.AdminModule,
            email_module_1.EmailModule,
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_2.ConfigModule],
                useFactory: async () => ({
                    secret: config_1.JWT_COOKIE_SECRET,
                }),
                inject: [config_2.ConfigService],
            }),
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            nestjs_sendgrid_1.SendGridModule.forRoot({
                apiKey: process.env.SENDGRID_SECRET,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map