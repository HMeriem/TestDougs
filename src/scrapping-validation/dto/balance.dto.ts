import { IsDate, IsNumber } from "class-validator";
import { Balance } from "../model/balance.interface";


export class BalanceDto implements Balance {
  @IsDate()
  date: Date;

  @IsNumber()
  balance: number;
}