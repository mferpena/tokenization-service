# Imagen base de Node.js
FROM node:18.19.1

# Directorio de la aplicación dentro del contenedor
WORKDIR /usr/src/app

# Copia de los archivos de definición de paquetes de Node.js
COPY package*.json ./

# Instalación de dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compilación de la aplicación TypeScript a JavaScript
RUN npm run build

# Exposición del puerto que tu aplicación utiliza
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/server.js"]
