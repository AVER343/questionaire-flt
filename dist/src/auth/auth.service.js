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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const util_1 = require("util");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AuthService = class AuthService {
    constructor(userService, prisma) {
        this.userService = userService;
        this.prisma = prisma;
    }
    async signup(data) {
        let user = await this.userService.createUser(data);
        return user;
    }
    async checkCredentials(data) {
        let user = await this.userService.findByUsername(data.username);
        if (!user)
            throw new common_1.NotFoundException('User not found !');
        let [hash, salt] = user.password.split('.');
        let hashedPassword = (await scrypt(data.password, salt, 32));
        if (hash != hashedPassword.toString('hex'))
            throw new common_1.BadRequestException('Invalid credentials !');
        return user;
    }
    async resetPassword(data) { }
    async verifyOTP(data) {
    }
    generateOTP(length) {
        let otp = ``;
        Array(length || 6)
            .fill((e) => 3)
            .map((e) => (otp = otp + Math.floor(Math.random() * 9.9)));
        return otp;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map