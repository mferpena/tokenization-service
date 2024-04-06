export interface IStorageService {
  set(
    key: string,
    value: string,
    expirationTimeInSeconds?: number
  ): Promise<void>;
  get(key: string): Promise<string | null>;
}
