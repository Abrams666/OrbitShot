FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# nodemon 需要全域或本地安裝
RUN npm install -g nodemon

EXPOSE 5000
CMD ["nodemon", "server.js"]