import { SignJWT, jwtVerify } from "jose";
import { TokenServiceImpl } from "../src/core/usecases/services/TokenServiceImpl";
import CustomError from "../src/core/domain/exceptions/CustomException";

// Configuración de mock para SignJWT y jwtVerify
jest.mock("jose", () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue("mockToken"),
  })),
  jwtVerify: jest.fn(),
}));

describe("TokenServiceImpl", () => {
  let tokenService: TokenServiceImpl;

  beforeEach(() => {
    // Reiniciar los mocks antes de cada prueba
    jest.clearAllMocks();
    tokenService = new TokenServiceImpl();
  });

  describe("generateToken", () => {
    it("should generate a token successfully", async () => {
      const cardData = {
        cardNumber: "4111111111111111",
        cvv: "123",
        expirationMonth: "12",
        expirationYear: "2030",
        email: "test@example.com",
      };
      const token = await tokenService.generateToken(cardData);

      expect(SignJWT).toHaveBeenCalledTimes(1);
      expect(token).toEqual("mockToken");
    });
  });

  describe("verifyToken", () => {
    it("should return payload successfully when token is valid", async () => {
      (jwtVerify as jest.Mock).mockResolvedValue({
        payload: { cardData: "mockData" },
      });
      const payload = await tokenService.verifyToken("validToken");

      expect(jwtVerify).toHaveBeenCalledTimes(1);
      expect(payload).toEqual({ cardData: "mockData" });
    });

    it("should throw 'Token verification failed' error for invalid tokens", async () => {
      (jwtVerify as jest.Mock).mockRejectedValue(
        new Error("signature verification failed")
      );

      await expect(tokenService.verifyToken("invalidToken")).rejects.toThrow(
        new CustomError("Signature verification failed", 500)
      );
    });
  });
});
