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
exports.MailingService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
let MailingService = class MailingService {
    constructor(sendgridService) {
        this.sendgridService = sendgridService;
    }
    async delegate_consumerSendMail(data) {
        data.from = 'aver343.sendgrid@gmail.com';
        this.sendgridService.send(data, false, (err, result) => console.log({ err, result: JSON.stringify(result) }));
    }
    async deleteFromActive(err, res, data) {
        if (err) {
            console.error(err);
        }
        else {
        }
    }
};
MailingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_sendgrid_1.InjectSendGrid)()),
    __metadata("design:paramtypes", [nestjs_sendgrid_1.SendGridService])
], MailingService);
exports.MailingService = MailingService;
//# sourceMappingURL=_email.service.js.map