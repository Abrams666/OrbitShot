
FROM node:lts-alpine

WORKDIR /app

COPY package.json .

RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 80

CMD ["/bin/ash", "-c", "npm install && npm run start"]