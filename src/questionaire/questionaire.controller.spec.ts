import { Test, TestingModule } from '@nestjs/testing';
import { QuestionaireController } from './questionaire.controller';

describe('QuestionaireController', () => {
  let controller: QuestionaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionaireController],
    }).compile();

    controller = module.get<QuestionaireController>(QuestionaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
