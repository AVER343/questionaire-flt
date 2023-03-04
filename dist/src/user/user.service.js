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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
const util_1 = require("util");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let UserService = class UserService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async findById(id) {
        if (!id) {
            return null;
        }
        let user = await this.prisma.users.findFirst({ where: { id } });
        return user;
    }
    async getEmail(user_id) {
        let userEmail = await this.prisma.userEmail.findFirst({
            where: { user_id },
        });
        return userEmail;
    }
    async createUser(data) {
        let { email, password, phoneNumber, username } = data;
        if (!email && !phoneNumber) {
            throw new Error(`email / phone number is required`);
        }
        if (await this.prisma.users.findFirst({ where: { username } })) {
            throw new common_1.BadRequestException('Account with username already exists');
        }
        if (await this.prisma.userEmail.findFirst({ where: { email } })) {
            throw new common_1.BadRequestException('Account with email already exist');
        }
        if (await this.prisma.userPhone.findFirst({
            where: { phone_number: phoneNumber },
        })) {
            throw new common_1.BadRequestException('Account with phone number already exists');
        }
        const salt = (0, crypto_1.randomBytes)(12).toString('hex');
        const hash = (await scrypt(password, salt, 32));
        password = hash.toString('hex') + '.' + salt;
        let created_user = await this.prisma.users.create({
            data: { username, password },
        });
        if (email) {
            await this.prisma.userEmail.create({
                data: { email, user_id: created_user.id },
            });
        }
        if (phoneNumber) {
            await this.prisma.userPhone
                .create({
                data: { phone_number: phoneNumber, user_id: created_user.id },
            })
                .catch((e) => {
                throw new common_1.BadRequestException(e.message);
            });
        }
        return created_user;
    }
    async getJWT(user) {
        let _user = Object.assign({}, user);
        delete _user.password;
        let token = await this.jwtService.signAsync(_user, { expiresIn: '3d' });
        return token;
    }
    async findByEmail(email) {
        if (!email)
            return null;
        let userEmail = await this.prisma.userEmail.findFirst({ where: { email } });
        if (!userEmail)
            return null;
        let user = await this.prisma.users.findFirst({
            where: { id: userEmail.user_id },
        });
        return user;
    }
    async findByUsername(username) {
        if (!username)
            return null;
        let user = await this.prisma.users.findFirst({ where: { username } });
        if (!user)
            return null;
        return user;
    }
    async verifyJWT(JWT) {
        let verified_user = await this.jwtService.verifyAsync(JWT);
        return verified_user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map