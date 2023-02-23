import { Injectable, Logger } from '@nestjs/common';
import { BalanceDto } from '../dto/balance.dto';
import { MovementDto } from '../dto/movement.dto';
import { Balance } from '../model/balance.interface';
import { isNumber } from 'class-validator';
import { Movement } from '../model/movement.interface';
import { isValidDate } from 'rxjs/internal/util/isDate';
import { isString } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class ScrappingValidationService {
  private readonly logger = new Logger(ScrappingValidationService.name);

  public validate(request: {
    balances: BalanceDto[];
    movements: MovementDto[];
  }): {
    code: number;
    message: string;
    reason?: string[];
  } {
    const reason = [];
    const balance: Balance = request.balances.pop();
    const balanceMovementsEquality: boolean =
      this.checkBalanceMovementsEquality(balance, request.movements);

    if (!balanceMovementsEquality) {
      const balanceIntegrity: { valid: boolean; reason?: string[] } =
        this.checkBalanceIntegrity(balance);

      const movementsIntegrity: {
        valid: boolean;
        reason?: string[];
      } = this.findIncoherentMovements(request.movements, balance.date);

      if (!movementsIntegrity.valid) {
        reason.push([
          'Des erreurs ont été retrouvée dans les mouvemnts: ' +
            movementsIntegrity.reason,
        ]);
      }

      if (!balanceIntegrity.valid) {
        reason.push([
          'Des erreurs ont été retrouvée dans la balance: ' +
            balanceIntegrity.reason,
        ]);
      }

      reason.push([
        'Le montant de la balance ne correspond pas à celui des mouvements ',
      ]);
      return this.buildValidateApiResponse(false, reason);
    }

    return this.buildValidateApiResponse(true);
  }

  public checkBalanceMovementsEquality(
    balance: Balance,
    movements: Movement[],
  ): boolean {
    const movementsPeriodAmount: number =
      this.getPeriodAmountByMovements(movements);

    return movementsPeriodAmount == balance.balance;
  }

  private checkBalanceIntegrity(balance: Balance): {
    valid: boolean;
    reason?: string[];
  } {
    const date: Date = new Date(balance.date);
    let valid = true;
    const reasons: string[] = [];

    if (balance.balance === undefined || balance.date === undefined) {
      valid = false;
      reasons.push('Des données sont manquantes');
    }
    if (balance.balance < 0) {
      valid = false;
      reasons.push('La balance est inférieure à 0');
    }

    if (!isNumber(balance.balance)) {
      valid = false;
      reasons.push('La balance est une donnée invalide');
    }

    if (!isValidDate(date)) {
      valid = false;
      reasons.push('La date de la balance est invalide');
    }

    const now: Date = new Date();
    if (balance.date > now) {
      valid = false;
      reasons.push('La date est dans le futur');
    }

    return { valid: valid, reason: reasons };
  }

  private getPeriodAmountByMovements(movements: Movement[]): number {
    let periodAmount = 0;
    movements.forEach((movement: Movement) => {
      periodAmount += movement.amount;
    });

    return periodAmount;
  }

  private buildValidateApiResponse(
    valid: boolean,
    reason?: string[],
  ): { code: number; message: string; reason?: string[] } {
    if (valid) {
      return { code: 200, message: 'Accepted' };
    } else {
      return { code: 401, message: 'Im a tea pot', reason: reason };
    }
  }

  private findIncoherentMovements(
    movements: Movement[],
    dateBalance: Date,
  ): {
    valid: boolean;
    reason: string[];
  } {
    let valid = true;
    const reasons: string[] = [];

    movements.forEach((movement: Movement) => {
      const movementIntegrity: { valid: boolean; reason: string[] } =
        this.checkMovementsIntegrity(movement, dateBalance);
      const result = movements.filter(
        (movementToCkeck) =>
          movementToCkeck.date == movement.date &&
          movementToCkeck.label == movement.label &&
          movementToCkeck.amount == movement.amount,
      );

      if (result.length > 1) {
        const resultId: number[] = [];
        result.forEach((res: Movement) => {
          resultId.push(res.id);
        });
        reasons.push(
          'Le mouvement id ' +
            movement.id +
            ' est dupliqué aux ids ' +
            resultId,
        );
        valid = false;
      }

      if (!movementIntegrity.valid) {
        movementIntegrity.reason.forEach((reason: string) => {
          reasons.push(reason);
        });

        valid = false;
      }
    });

    return { valid: valid, reason: reasons };
  }

  private checkMovementsIntegrity(
    movement: Movement,
    dateBalance: Date,
  ): {
    valid: boolean;
    reason: string[];
  } {
    const reasons: string[] = [];
    let valid = true;
    const date: Date = new Date(movement.date);

    if (!isValidDate(date)) {
      reasons.push(
        'Le mouvement id ' + movement.id + " n'a pas de date correct ",
      );
      valid = false;
    }

    if (valid) {
      const dateBalanceValid: Date = new Date(dateBalance);
      if (date > dateBalanceValid) {
        reasons.push(
          'Le mouvement id ' +
            movement.id +
            ' a une date postérieur à celle de la balance ',
        );
        valid = false;
      }
    }
    if (!isNumber(movement.amount)) {
      reasons.push(
        'Le mouvement id ' + movement.id + " n'a pas de montant correct ",
      );
      valid = false;
    }
    if (!isNumber(movement.id)) {
      reasons.push('Le mouvement id ' + movement.id + " n'a pas d'id correct ");
      valid = false;
    }
    if (!isString(movement.label)) {
      reasons.push(
        'Le mouvement id ' + movement.id + " n'a pas de date correct ",
      );
      valid = false;
    }

    return {
      valid: valid,
      reason: reasons,
    };
  }
}
