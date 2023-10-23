FROM node:19.7.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN rm -rf dist/*
RUN npm run build

FROM nginx:1.23.2-alpine
EXPOSE 80
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/bevo-cms-front /usr/share/nginx/html