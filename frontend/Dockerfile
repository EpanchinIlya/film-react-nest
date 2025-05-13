
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
# npm i
RUN npm install
RUN npm install @rollup/rollup-linux-x64-musl --force
COPY . .
RUN npm run build

# FROM alpine/git AS static_files
FROM node:22-alpine AS production

WORKDIR /app
COPY --from=build /app/dist /app/dist





# # Этап сборки (builder stage)
# FROM node:22-alpine AS build

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# RUN npm install @rollup/rollup-linux-x64-musl --force
# COPY . .
# RUN npm run build

# # Этап для создания тома с собранной статикой
# FROM alpine/git AS static_files
# WORKDIR /app
# COPY --from=build /app/dist /app/output