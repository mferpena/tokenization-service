import express from "express";
import { cardRoutes } from "./infrastructure/primary/routes/CardRoutes";
import { notFoundMiddleware } from "./infrastructure/primary/middlewares/NotFoundMiddleware";
import { RedisStorageService } from "./infrastructure/secondary/persistence/RedisStorageService";
import { TokenServiceImpl } from "./core/usecases/services/TokenServiceImpl";
import { globalErrorHandler } from "./infrastructure/primary/middlewares/GlobalMiddleware";

const app = express();

app.use(express.json());

const tokenService = new TokenServiceImpl();
const storageService = new RedisStorageService();

app.use("/api/v1/cards", cardRoutes(tokenService, storageService));

// Middleware para manejar rutas no encontradas
app.use(notFoundMiddleware);

// Middleware global de manejo de errores
app.use(globalErrorHandler);

export default app;
