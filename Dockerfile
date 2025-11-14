FROM node:18-bullseye

WORKDIR /app

# 安裝工具（nuxt 有時候需要）
#RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# 先複製 backend & frontend 的 package.json
COPY backend/package.json backend/package-lock.json ./backend/
COPY frontend/package.json frontend/package-lock.json ./frontend/

# 安裝 backend 依賴
WORKDIR /app/backend
RUN npm install --legacy-peer-deps

# 安裝 frontend 依賴
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps

# 複製整個專案
WORKDIR /app
COPY . .

# build Nuxt 前端
WORKDIR /app/frontend
RUN npm run build

# 安裝 concurrently（管理同時啟動兩個服務）
WORKDIR /app
RUN npm install -g concurrently

EXPOSE 3000
EXPOSE 5000

# 同時啟動 backend + nuxt
CMD concurrently \
    "cd backend && npm start" \
    "cd frontend && npm run start -- -p 3000 --hostname 0.0.0.0"