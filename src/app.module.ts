import { Module } from '@nestjs/common';
import { ScrappingValidationModule } from './scrapping-validation/scrapping-validation.module';

@Module({
  imports: [ScrappingValidationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
