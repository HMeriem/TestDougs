import { Test, TestingModule } from '@nestjs/testing';
import { ScrappingValidationService } from './scrapping-validation.service';

describe('ScrappingValidationService', () => {
  let service: ScrappingValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrappingValidationService],
    }).compile();

    service = module.get<ScrappingValidationService>(
      ScrappingValidationService,
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validate', () => {
    it('should call checkBalanceMovementsEquality', () => {
      jest.spyOn(service, 'checkBalanceMovementsEquality');
      service.validate({
        movements: [
          {
            id: 1,
            date: '202hfdwhdwhdw3h,g-02-23' as unknown as Date,
            label: 'retrait',
            amount: 25,
          },
          {
            id: 2,
            date: '2023-02-22T18:06:32.762Z' as unknown as Date,
            label: 'retrait',
            amount: 25,
          },
          {
            id: 3,
            date: '2023-02-22T18:06:32.762Z' as unknown as Date,
            label: 'retrait',
            amount: 25,
          },
          {
            id: 4,
            date: '2023-02-22T18:06:32.762Z' as unknown as Date,
            label: 'retrait',
            amount: 25,
          },
        ],
        balances: [
          {
            date: '2022-02-22T18:06:32.762Z' as unknown as Date,
            balance: 123,
          },
        ],
      });

      expect(service.checkBalanceMovementsEquality).toHaveBeenCalledTimes(1);
    });
  });
});
