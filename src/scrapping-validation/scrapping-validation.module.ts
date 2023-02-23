import { Module } from '@nestjs/common';
import { ScrappingValidationService } from './services/scrapping-validation.service';
import { ScrappingValidationController } from "./controller/scrapping-validation.controller";

@Module({
  providers: [ScrappingValidationService],
  controllers: [ScrappingValidationController],
  exports: [ScrappingValidationService]
})
export class ScrappingValidationModule {}
