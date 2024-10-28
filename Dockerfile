# Etapa de construcción
FROM node:18 as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación de React
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine

# Copia los archivos de construcción de React a la carpeta pública de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto en el que se sirve la aplicación
EXPOSE 80

# Comando para correr nginx
CMD ["nginx", "-g", "daemon off;"]
