import { createClient, RedisClientType } from "redis";
import { IStorageService } from "../../../core/ports/IStoragePort";
import logger from "../../../infrastructure/config/logger";

export class RedisStorageService implements IStorageService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      password: process.env.REDIS_PASSWORD,
    });

    // Intenta conectar y maneja errores de conexión sincrónicamente aquí.
    this.client.connect().catch((err) => {
      logger.error(`Error al conectar con Redis: ${err.message}`);
    });

    // Maneja errores de conexión y otros errores de Redis asincrónicamente aquí.
    this.client.on("error", (err) => {
      logger.error(`Error de Redis: ${err.message}`);
    });
  }

  async set(
    key: string,
    value: string,
    expirationTimeInSeconds: number = 60
  ): Promise<void> {
    try {
      await this.client.set(key, value, { EX: expirationTimeInSeconds });
    } catch (err) {
      logger.error(
        `Error al establecer el valor en Redis para la clave ${key}: ${err}`,
        { key, err }
      );
      throw err;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (err) {
      logger.error(
        `Error al obtener el valor de Redis para la clave ${key}: ${err}`,
        { key, err }
      );
      throw err;
    }
  }
}
