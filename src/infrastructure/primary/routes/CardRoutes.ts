import { Router } from "express";
import { CardController } from "../controllers/CardController";
import { validateCardInput } from "../middlewares/ValidationMiddleware";
import { CardServiceImpl } from "../../../core/usecases/services/CardServiceImpl";
import { ITokenProvider } from "../../../core/usecases/ITokenProvider";
import { IStorageService } from "../../../core/ports/IStoragePort";

export function cardRoutes(
  tokenProvider: ITokenProvider,
  storageService: IStorageService
): Router {
  const router = Router();

  const cardService = new CardServiceImpl(storageService, tokenProvider);
  const cardController = new CardController(cardService);

  router.post("/tokenize", validateCardInput, cardController.tokenizeCard);
  router.get("/card/:token", cardController.getCardData);

  return router;
}
