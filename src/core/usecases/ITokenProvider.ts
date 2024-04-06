import { CardData } from "../domain/models/Card";

export interface ITokenProvider {
  generateToken(data: CardData): Promise<string>;
  verifyToken(token: string): Promise<any>;
}
