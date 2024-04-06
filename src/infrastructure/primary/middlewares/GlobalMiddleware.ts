// En ./src/middlewares/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { response } from "../../../core/domain/helpers/ResponseHelpers";
import logger from "../../config/logger";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Unhandled Error: ${err.message}. ${err}`);

  res
    .status(500)
    .json(response(500, err.message || "An unexpected error occurred"));
};
