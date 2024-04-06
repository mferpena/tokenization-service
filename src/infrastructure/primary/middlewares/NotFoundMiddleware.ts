import { Request, Response, NextFunction } from "express";
import { response } from "../../../core/domain/helpers/ResponseHelpers";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json(response(404, "Not Found"));
};
