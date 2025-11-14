FROM node:lts-alpine

WORKDIR /app/backend

COPY package.json .

RUN npm install

EXPOSE 5000

CMD ["/bin/ash", "-c", "npm i && npm run start"]
