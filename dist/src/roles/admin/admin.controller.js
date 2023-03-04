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
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
const common_1 = require("@nestjs/common");
const authorization_guard_1 = require("../../common/guards/authorization.guard");
const set_api_name_decorator_1 = require("../../common/decorator/set-api-name.decorator");
const api_names_enum_1 = require("../../common/enums/api.names.enum");
const serialize_interceptor_1 = require("../../common/interceptor/serialize.interceptor");
const user_dto_1 = require("../../user/dto/user.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAdmin() {
        let admins = await this.adminService.getAdmins();
        return admins;
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    (0, set_api_name_decorator_1.SetApiName)(api_names_enum_1.API_NAME.GET_ADMIN),
    (0, common_1.UseGuards)(authorization_guard_1.CheckAPIAuthorization),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdmin", null);
AdminController = __decorate([
    (0, common_1.Controller)('/admin'),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map