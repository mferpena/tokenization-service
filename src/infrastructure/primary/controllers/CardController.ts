import { Request, Response } from "express";
import { ICardUseCase } from "../../../core/usecases/ICardUseCase";
import { response } from "../../../core/domain/helpers/ResponseHelpers";
import CustomError from "../../../core/domain/exceptions/CustomException";

export class CardController {
  private cardService: ICardUseCase;

  constructor(cardService: ICardUseCase) {
    this.cardService = cardService;
  }

  public tokenizeCard = async (req: Request, res: Response) => {
    try {
      const token = await this.cardService.tokenize(req.body);
      res.json({ token });
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json(response(error.statusCode, error.message));
      } else {
        res.status(500).json(response(500, "An unexpected error occurred"));
      }
    }
  };

  public getCardData = async (req: Request, res: Response) => {
    try {
      const cardData = await this.cardService.getCardData(req.params.token);
      res.json(cardData);
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json(response(error.statusCode, error.message));
      } else {
        res.status(500).json(response(500, "An unexpected error occurred"));
      }
    }
  };
}
