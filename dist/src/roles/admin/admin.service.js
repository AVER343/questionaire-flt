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
exports.AdminService = void 0;
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
let AdminService = class AdminService {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async getAdmins() {
        let admins = (await this.prisma.userRole.findMany({
            where: {
                user_role_type: { user_role: 'ADMIN' },
            },
        })).map((e) => e.user_id);
        admins = admins.map((e) => this.userService.findById(e));
        admins = (await Promise.all(admins));
        admins = admins.filter((e) => e.status <= 2);
        return admins;
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, user_service_1.UserService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map