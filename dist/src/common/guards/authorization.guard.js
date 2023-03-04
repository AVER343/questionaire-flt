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
exports.CheckAPIAuthorization = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const services_1 = require("@nestjs/core/services");
let CheckAPIAuthorization = class CheckAPIAuthorization {
    constructor(reflector, prismaService) {
        this.reflector = reflector;
        this.prismaService = prismaService;
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const api_name = this.reflector.get('API_NAME', context.getHandler());
        let user_id = (_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a.id;
        let roles = (await this.prismaService.userRole.findMany({
            where: {
                user_id,
            },
        })).map((e) => e.user_role);
        let isAuthorized = !!!(await this.prismaService.apiRolePermissions.findFirst({
            where: {
                role_type_id: { in: roles },
                ApiNames: {
                    api_name,
                },
            },
        }));
        let hasSpecialPermissions = null;
        if (!isAuthorized) {
            hasSpecialPermissions =
                !!!(await this.prismaService.special_permissions.findFirst({
                    where: { user_id, ApiNames: { api_name } },
                }));
        }
        if (!isAuthorized && !hasSpecialPermissions)
            throw new common_1.UnauthorizedException('Unauthorized access');
        return true;
    }
};
CheckAPIAuthorization = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(prisma_service_1.PrismaService)),
    __metadata("design:paramtypes", [services_1.Reflector,
        prisma_service_1.PrismaService])
], CheckAPIAuthorization);
exports.CheckAPIAuthorization = CheckAPIAuthorization;
//# sourceMappingURL=authorization.guard.js.map