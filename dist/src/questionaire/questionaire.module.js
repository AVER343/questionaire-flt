"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionaireModule = void 0;
const common_1 = require("@nestjs/common");
const questionaire_controller_1 = require("./questionaire.controller");
const questionaire_service_1 = require("./questionaire.service");
let QuestionaireModule = class QuestionaireModule {
};
QuestionaireModule = __decorate([
    (0, common_1.Module)({
        controllers: [questionaire_controller_1.QuestionaireController],
        providers: [questionaire_service_1.QuestionaireService],
    })
], QuestionaireModule);
exports.QuestionaireModule = QuestionaireModule;
//# sourceMappingURL=questionaire.module.js.map