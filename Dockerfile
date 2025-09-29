# ==============================
# Stage 1: Build con Node
# ==============================
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Generamos el build de producción
RUN npm run build

# ==============================
# Stage 2: Servir con Nginx
# ==============================
FROM nginx:alpine

# Copiamos el build de Vite a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos la configuración de Nginx desde el repo del frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]