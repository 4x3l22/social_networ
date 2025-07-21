# Etapa 1: Construcción
FROM node:22.14.0 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build --configuration=production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos de la build Angular al directorio público de Nginx
COPY --from=build /app/dist/front/browser /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
