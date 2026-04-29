# Build stage
FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html
# Note: nginx configuration will be injected via volume mount in docker-compose, or a custom one can be copied here.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
