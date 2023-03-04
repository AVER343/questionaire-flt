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
exports.CurrentUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../../config");
const user_service_1 = require("../../user/user.service");
let CurrentUserMiddleware = class CurrentUserMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        let user = null;
        let token = (req.cookies && req.cookies[config_1.JWT_COOKIE_KEY]) || null;
        if (token) {
            let __user = await this.userService.verifyJWT(token);
            if (__user) {
                user = await this.userService.findById(__user.id);
                if (user && user.status > 2) {
                    let reason = (await this.userService.prisma.status.findFirst({
                        where: { id: user.status },
                    })).status;
                    throw new common_1.BadRequestException(`Your account has been ${reason}`);
                }
                if (user)
                    delete user.password;
            }
        }
        req.user = user;
        next();
    }
};
CurrentUserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], CurrentUserMiddleware);
exports.CurrentUserMiddleware = CurrentUserMiddleware;
//# sourceMappingURL=current-user.middleware.js.map