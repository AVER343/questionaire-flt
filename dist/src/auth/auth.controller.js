"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const createUser_dto_1 = require("../user/dto/createUser.dto");
const serialize_interceptor_1 = require("../common/interceptor/serialize.interceptor");
const user_dto_1 = require("../user/dto/user.dto");
const index_1 = require("../../config/index");
const login_dto_1 = require("./dto/login.dto");
const message_producer_service_1 = require("../communication/email/message.producer.service");
let AuthController = class AuthController {
    constructor(authService, messageProducerService) {
        this.authService = authService;
        this.messageProducerService = messageProducerService;
    }
    async signup(data, res) {
        let user = await this.authService.signup(data);
        let token = await this.authService.userService.getJWT(user);
        this.messageProducerService.sendOTP(user, {
            otp: this.authService.generateOTP(),
        });
        res.cookie(index_1.JWT_COOKIE_KEY, token);
        res.send(user);
    }
    async login(data, res) {
        let user = await this.authService.checkCredentials(data);
        if (!user) {
            throw new common_1.NotFoundException('No user found');
        }
        if (user.status > 2) {
            let reason = (await this.authService.prisma.status.findFirst({
                where: { id: user.status },
            })).status;
            throw new common_1.BadRequestException(`Your account has been ${reason}`);
        }
        let token = await this.authService.userService.getJWT(user);
        res.cookie(index_1.JWT_COOKIE_KEY, token);
        return user;
    }
    async logout(res) {
        res.clearCookie(index_1.JWT_COOKIE_KEY);
        res.status(200).send({});
    }
    async changePassword(username, res) {
        let user = await this.authService.userService.findByUsername(username);
        if (!user) {
            res.status(404);
            throw new common_1.NotFoundException('No user found');
        }
        let otp = await this.authService.generateOTP(6);
        this.messageProducerService.sendOTP(user, { otp });
        return 'OTP has been sent to the provided email !';
    }
    async verifyOTP(username) { }
};
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('/otp/:username'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/verify/otp/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOTP", null);
AuthController = __decorate([
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        message_producer_service_1.MailingProducerService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map