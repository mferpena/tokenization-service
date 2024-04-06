import { SignJWT, jwtVerify } from "jose";
import { CardData } from "../../domain/models/Card";
import { ITokenProvider } from "../ITokenProvider";
import { TextEncoder } from "util";
import CustomError from "../../domain/exceptions/CustomException";

export class TokenServiceImpl implements ITokenProvider {
  private static readonly ALGORITHM = "HS256";

  public async generateToken(data: CardData): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET ?? "";

    const encoder = new TextEncoder();
    const token = await new SignJWT({ data })
      .setProtectedHeader({ alg: TokenServiceImpl.ALGORITHM })
      .setExpirationTime("1m") // Establece el tiempo de expiración a 1 minuto
      .sign(encoder.encode(jwtSecret));

    return token;
  }

  public async verifyToken(token: string): Promise<any> {
    const jwtSecret = process.env.JWT_SECRET ?? "";

    try {
      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(token, encoder.encode(jwtSecret));

      return payload;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("expired")) {
          throw new CustomError("Token expired", 500);
        } else if (error.message.includes("signature verification failed")) {
          throw new CustomError("Signature verification failed", 500);
        } else {
          throw new CustomError("Token verification failed", 500);
        }
      } else {
        throw new CustomError("Unknown error during token verification", 500);
      }
    }
  }
}
