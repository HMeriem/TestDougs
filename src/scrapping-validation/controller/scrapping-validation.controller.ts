import { Body, Controller, Post, Res } from '@nestjs/common';
import { ScrappingValidationService } from '../services/scrapping-validation.service';
import { Response } from 'express';
import { BalanceDto } from '../dto/balance.dto';
import { MovementDto } from '../dto/movement.dto';
import { ValidationResponse } from '../model/validationResponse.interface';

@Controller('movements')
export class ScrappingValidationController {
  constructor(
    private readonly scrappingValidationService: ScrappingValidationService,
  ) {}

  @Post('/validate')
  public validate(
    @Body() request: { balances: BalanceDto[]; movements: MovementDto[] },
    @Res() response: Response,
  ): void {
    const validation: ValidationResponse =
      this.scrappingValidationService.validate(request);
    response.status(validation.code);
    if (validation.code !== 200) {
      response.send({ message: validation.message, reason: validation.reason });
    } else {
      response.send({ message: validation.message });
    }
  }
}
