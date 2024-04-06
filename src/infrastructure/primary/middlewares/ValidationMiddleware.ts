import { Request, Response, NextFunction } from "express";
import {
  isValidCardNumber,
  isValidCVV,
  isValidExpirationMonth,
  isValidExpirationYear,
  isValidEmail,
} from "../../../core/domain/utilities/Validation";
import logger from "../../../infrastructure/config/logger";
import CustomError from "../../../core/domain/exceptions/CustomException";

export const validateCardInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { card_number, cvv, expiration_month, expiration_year, email } =
    req.body;

  try {
    // Valida el número de tarjeta con el algoritmo de Luhn
    if (!isValidCardNumber(card_number)) {
      throw new CustomError("Invalid card number", 500);
    }

    // Valida el formato del email
    if (!isValidEmail(email)) {
      throw new CustomError("Invalid email format", 500);
    }

    // Valida la longitud de CVV
    if (!isValidCVV(cvv)) {
      throw new CustomError("Invalid CVV", 500);
    }

    // Valida el mes de expiración
    if (!isValidExpirationMonth(expiration_month)) {
      throw new CustomError("Invalid expiration month", 500);
    }

    // Valida el año de expiración
    if (!isValidExpirationYear(expiration_year)) {
      throw new CustomError("Invalid expiration year", 500);
    }

    next();
  } catch (error) {
    logger.error("Unexpected error occurred during card validation. " + error);
    next(error); // Pasa el error al siguiente middleware de manejo de errores
  }
};
