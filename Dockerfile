# build stage
FROM node:12.16.2 as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]