import { Test, TestingModule } from '@nestjs/testing';
import { QuestionaireService } from './questionaire.service';

describe('QuestionaireService', () => {
  let service: QuestionaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionaireService],
    }).compile();

    service = module.get<QuestionaireService>(QuestionaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
