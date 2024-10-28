# Etapa de construcción
FROM node:20.2 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación de Vite
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine

# Copia la carpeta 'dist' al directorio público de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración de nginx personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para correr nginx
CMD ["nginx", "-g", "daemon off;"]
