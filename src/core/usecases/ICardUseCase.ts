import { CardData } from "../domain/models/Card";

export interface ICardUseCase {
  tokenize(cardData: CardData): Promise<string>;
  getCardData(token: string): Promise<any>;
}
