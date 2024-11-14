# Etapa de construcción
FROM node:20.9.0 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN apt update && apt install -y curl

# actualiza npm
RUN npm install npm@latest -g

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

# Busca en todos los archivos la ruta https://tulookapiv2.vercel.app/api y la reemplaza por https://localhost:8080/
RUN sed -i 's|https://tulookapiv2.vercel.app/api|https://localhost:8080/api|g' /usr/share/nginx/html/index.html

# Expone el puerto 80
EXPOSE 80

# Comando para correr nginx
CMD ["nginx", "-g", "daemon off;"]
