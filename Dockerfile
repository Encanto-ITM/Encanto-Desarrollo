# Etapa 1: Construcción
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./

# Busca en los archivos .jsx las coincidencias de tulookapiv2.vercel.app/api y las reemplaza por localhost:8080/api
RUN sed -i 's/tulookapiv2.vercel.app/localhost:8080/g' package.json

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Servidor de producción
FROM nginx:alpine

# Elimina configuraciones predeterminadas de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia los archivos construidos en la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
