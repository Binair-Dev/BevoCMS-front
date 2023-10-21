FROM nginx:stable-alpine3.17-slim

COPY ./dist/* /usr/share/nginx/html

# Exposer le port sur lequel l'application Spring Boot fonctionnera (par défaut 8080)
EXPOSE 80