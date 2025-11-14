FROM node:lts-alpine

WORKDIR /app/frontend

COPY package.json .

RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install

COPY nuxt.config.ts .
COPY tsconfig.json .

EXPOSE 3000

CMD ["/bin/ash", "-c", "npm i && npm run build && npm run start"]
