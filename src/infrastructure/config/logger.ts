import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info", // Nivel mínimo para log
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Agrega una marca de tiempo al log
    format.errors({ stack: true }), // Asegura que las pilas de error sean logueadas
    format.splat(), // Provee soporte para string interpolation
    format.json() // Formatea el mensaje de log como JSON
  ),
  transports: [
    // Log a la consola
    new transports.Console({ level: "debug" }), // Nivel más verboso para desarrollo
    // Log a archivos u otros destinos según el entorno
    new transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
