interface Response {
  statusCode: number;
  message: string;
}

export const response = (statusCode: number, message: string): Response => ({
  statusCode,
  message,
});
