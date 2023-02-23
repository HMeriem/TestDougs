import { Test, TestingModule } from '@nestjs/testing';
import { ScrappingValidationService } from '../services/scrapping-validation.service';
import { ScrappingValidationController } from './scrapping-validation.controller';

describe('ScrappingValidationController', () => {
  let controller: ScrappingValidationController;

  const scrappingValidationServiceSpy = {
    validate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrappingValidationController],
      providers: [
        {
          provide: ScrappingValidationService,
          useValue: scrappingValidationServiceSpy,
        },
      ],
    }).compile();

    controller = module.get<ScrappingValidationController>(
      ScrappingValidationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
