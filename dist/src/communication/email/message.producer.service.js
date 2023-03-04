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
exports.MailingProducerService = void 0;
const user_service_1 = require("../../user/user.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("../../../config");
let MailingProducerService = class MailingProducerService {
    constructor(queue, userService, prismaService) {
        this.queue = queue;
        this.userService = userService;
        this.prismaService = prismaService;
    }
    async sendOTP(user, _data) {
        let opted_out = [];
        let data = {
            otp: _data.otp,
            name: user.username,
            validTill: new Date(Date.now() + 60 * 15).toString(),
        };
        let userEmail = await this.userService.getEmail(user.id);
        let send_message = {
            to: userEmail.email,
            personalization: [
                {
                    to: { email: userEmail.email },
                    dynamicTemplateData: data,
                },
            ],
            subject: 'OTP',
            text: 'Hi welcome to our app',
            html: `<h1>${JSON.stringify(data)}</h1>`,
        };
        let activeQueue = await this.prismaService.queueActive.create({
            data: {
                user_id: userEmail.user_id,
                queue_type: config_1.QUEUES.SEND_EMAIL,
                data: send_message,
            },
        });
        await this.queue.add('message-job', {
            props: {
                queue_id: activeQueue.id,
                email: userEmail.email,
                user_id: userEmail.user_id,
                queue_type: config_1.QUEUES.SEND_EMAIL,
            },
            data: send_message,
        });
    }
};
MailingProducerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)(config_1.QUEUES.SEND_EMAIL)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        prisma_service_1.PrismaService])
], MailingProducerService);
exports.MailingProducerService = MailingProducerService;
//# sourceMappingURL=message.producer.service.js.map