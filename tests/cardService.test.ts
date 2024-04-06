import { CardServiceImpl } from "../src/core/usecases/services/CardServiceImpl";
import { IStorageService } from "../src/core/ports/IStoragePort";
import { ITokenProvider } from "../src/core/usecases/ITokenProvider";
import { CardData } from "../src/core/domain/models/Card";

const mockStorageService: jest.Mocked<IStorageService> = {
  set: jest.fn(),
  get: jest.fn(),
};

const mockTokenProvider: jest.Mocked<ITokenProvider> = {
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
};

describe("CardServiceImpl", () => {
  let cardService: CardServiceImpl;
  let cardData: CardData;

  beforeEach(() => {
    cardService = new CardServiceImpl(mockStorageService, mockTokenProvider);
    cardData = {
      cardNumber: "1234567890123456",
      cvv: "123",
      expirationMonth: "12",
      expirationYear: "2025",
      email: "test@example.com",
    };

    jest.clearAllMocks();
  });

  test("should throw an error when token not found or expired", async () => {
    const token = "fakeToken";
    mockStorageService.get.mockResolvedValue(null);
    await expect(cardService.getCardData(token)).rejects.toThrow(
      "Token not found or expired"
    );
  });

  test("should successfully retrieve card data without the CVV when token exists", async () => {
    const token = "fakeToken";
    const storedData = JSON.stringify(cardData);
    mockStorageService.get.mockResolvedValue(storedData);

    const result = await cardService.getCardData(token);

    expect(mockStorageService.get).toHaveBeenCalledWith(token);

    expect(result.cvv).toBeUndefined();

    expect(result).toEqual({
      cardNumber: cardData.cardNumber,
      email: cardData.email,
      expirationMonth: cardData.expirationMonth,
      expirationYear: cardData.expirationYear,
    });
  });
});
