
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


# FROM alpine/git AS static_files

