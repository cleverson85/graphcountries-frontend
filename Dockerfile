FROM node:12-alpine as build
WORKDIR /app

COPY package.json /app
RUN npm install --silent

COPY . .
RUN npm run build --prod

FROM nginx:alpine

VOLUME /var/cache/nginx
COPY --from=build app/dist/graphcountries-frontend /usr/share/nginx/html
COPY --from=build /source/entrypoint.sh /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ./entrypoint.sh
