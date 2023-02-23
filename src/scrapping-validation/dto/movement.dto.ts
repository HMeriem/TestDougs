import { IsDate, IsNumber, IsString } from "class-validator";
import { Movement } from "../model/movement.interface";

export class MovementDto implements Movement {
  @IsDate()
  date: Date;

  @IsNumber()
  amount: number;

  @IsNumber()
  id: number;

  @IsString()
  label: string;


}