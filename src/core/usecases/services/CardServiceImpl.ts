import { CardData } from "../../domain/models/Card";
import { ICardUseCase } from "../ICardUseCase";
import { ITokenProvider } from "../ITokenProvider";
import { IStorageService } from "../../ports/IStoragePort";
import logger from "../../../infrastructure/config/logger";
import CustomError from "../../domain/exceptions/CustomException";

export class CardServiceImpl implements ICardUseCase {
  private tokenService: ITokenProvider;
  private storageService: IStorageService;

  constructor(storageService: IStorageService, tokenService: ITokenProvider) {
    this.tokenService = tokenService;
    this.storageService = storageService;
  }

  public async tokenize(cardData: CardData): Promise<string> {
    try {
      const token = await this.tokenService.generateToken(cardData);
      await this.storageService.set(token, JSON.stringify(cardData));
      logger.info(`Token generated and stored successfully`);
      return token;
    } catch (error) {
      logger.error(`Error generating token: ${error}`);
      throw error; // Re-lanza el error para manejarlo en capas superiores
    }
  }

  public async getCardData(token: string): Promise<any> {
    try {
      const cardDataString = await this.storageService.get(token);
      if (!cardDataString) {
        throw new CustomError("Token not found or expired", 404);
      }
      const cardData = JSON.parse(cardDataString);

      delete cardData.cvv;

      logger.info(`Card data retrieved successfully for token: ${token}`);
      return cardData;
    } catch (error) {
      logger.error(`Error retrieving card data: ${error}`);
      throw error;
    }
  }
}
