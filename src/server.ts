import dotenv from "dotenv";
dotenv.config(); // Carga las variables de entorno desde el archivo .env al principio

import app from "./app";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
