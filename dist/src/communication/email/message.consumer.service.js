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
exports.MailingConsumerService = void 0;
const prisma_service_1 = require("./../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const config_1 = require("../../../config");
const _email_service_1 = require("./utils/_email.service");
let MailingConsumerService = class MailingConsumerService {
    constructor(mailerService, prismaService) {
        this.mailerService = mailerService;
        this.prismaService = prismaService;
    }
    async consumerSendOTP(job) {
        try {
            let { data } = job.data;
            let new_data = Object.assign(Object.assign({}, data), { html: `<h1> STRONG START ${JSON.stringify(data)}</h1>` });
            await this.mailerService.delegate_consumerSendMail(new_data);
        }
        catch (e) {
            console.error(e);
        }
    }
    async handleQueueCompleted(job, result) {
        console.log({ job });
        let { props, data } = job.data;
        await this.prismaService.jobStatusTable.create({
            data: { queue_type: props.queue_type, data, user_id: props.user_id || 0 },
        });
        await this.prismaService.queueActive.delete({
            where: { id: props.queue_id },
        });
    }
};
__decorate([
    (0, bull_1.Process)('message-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailingConsumerService.prototype, "consumerSendOTP", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MailingConsumerService.prototype, "handleQueueCompleted", null);
MailingConsumerService = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)(config_1.QUEUES.SEND_EMAIL),
    __metadata("design:paramtypes", [_email_service_1.MailingService,
        prisma_service_1.PrismaService])
], MailingConsumerService);
exports.MailingConsumerService = MailingConsumerService;
//# sourceMappingURL=message.consumer.service.js.map