/** @format */

import { Module } from "@nestjs/common";
import { QuestionaireController } from "./questionaire.controller";
import { QuestionaireService } from "./questionaire.service";

@Module({
  controllers: [QuestionaireController],
  providers: [QuestionaireService],
})
export class QuestionaireModule {}
