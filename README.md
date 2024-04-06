# Servicio de Tokenización

Este servicio proporciona una API para la tokenización de información de tarjetas de crédito, almacenando los datos de manera segura en Redis.

## Configuración Inicial

### Requisitos Previos

- Node.js y npm
- Docker
- Minikube
- kubectl

## Instalación

Para configurar tu entorno local y ejecutar el proyecto:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/mferpena/tokenization-service.git
   cd tokenization-service
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

## Desarrollo y Ejecución

- **Compilar el proyecto:**

  Transpila el código TypeScript a JavaScript con el siguiente comando:

  ```bash
  npm run build
  ```

- **Iniciar el servicio:**

  Indispensable ejecutar redis:

  ```bash
  docker run --name redis-container -p 6379:6379 -d redis
  ```

  Ejecuta la aplicación en modo de producción:

  ```bash
  npm start
  ```

  Para desarrollo con recarga automática:

  ```bash
  npm run dev
  ```

## Pruebas

Ejecuta las pruebas unitarias para verificar que todo funcione correctamente:

```bash
npm test
```

## Dockerización y Despliegue en Kubernetes

### Construir la Imagen Docker

1. **Construye la imagen Docker del servicio:**

   ```bash
   docker build -t tokenization-service:v1.0.0 .
   ```

2. **Etiqueta y sube la imagen a un registro:**

   Reemplaza `mferpena` con tu usuario en Docker Hub:

   ```bash
   docker tag tokenization-service:v1.0.0 mferpena/tokenization-service:v1.0.0
   docker push mferpena/tokenization-service:v1.0.0
   ```

### Despliegue en Minikube

1. **Inicia Minikube:**

   ```bash
   minikube start
   ```

2. **Despliega Redis y el servicio de tokenización:**

   Asegúrate de estar en el directorio del proyecto y ejecuta:

   ```bash
   kubectl apply -f k8s/redis-deployment.yaml
   kubectl apply -f k8s/secret.yaml
   kubectl apply -f k8s/tokenization-service-deployment.yaml
   kubectl apply -f k8s/tokenization-service-service.yaml
   ```

3. **Accede al servicio:**

   Obtén la URL del servicio expuesto y úsala para interactuar con el servicio de tokenización:

   ```bash
   minikube service tokenization-service --url
   ```

4. **Update Tag**

   Comando para actualizar la version de la imagen

   ```bash
   kubectl set image deployment/tokenization-service tokenization-service=mferpena/tokenization-service:v2.0.0
   ```

   Mostrará el estado actual de tu deployment

   ```bash
   kubectl describe deployment tokenization-service
   ```

5. **Ver logs del pod**

   ```bash
   kubectl logs -f tokenization-service-84ddfbfd7c-tgszk
   ```

## Limpieza

Elimina los recursos creados y detén Minikube con los siguientes comandos:

```bash
kubectl delete -f k8s/
minikube stop
```
