
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
# npm i
RUN npm install
RUN npm install @rollup/rollup-linux-x64-musl --force
COPY . .

ARG  VITE_API_URL=https://api.filmiep.students.nomorepartiessbs.ru/api/afisha
ARG  VITE_CDN_URL=https://api.filmiep.students.nomorepartiessbs.ru/content/afisha



RUN VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL}  npm run build 


RUN npm run build

# FROM alpine/git AS static_files
FROM node:22-alpine AS production





WORKDIR /app
COPY --from=build /app/dist /app/dist






