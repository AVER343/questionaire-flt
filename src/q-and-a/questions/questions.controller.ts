import { Controller, Get } from '@nestjs/common';

@Controller('questions')
export class QuestionsController {
  @Get()
  findAll() {
    return ['This action returns all cats'];
  }
}
