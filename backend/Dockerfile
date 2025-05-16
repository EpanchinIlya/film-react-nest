FROM node:22-alpine AS builder

WORKDIR /var/www/app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build



FROM node:22-alpine AS production

WORKDIR /var/www/app


COPY --from=builder /var/www/app/package*.json ./


RUN npm install --only=production


COPY --from=builder /var/www/app/dist ./dist
COPY --from=builder /var/www/app/public ./public

RUN apk add --no-cache mc

EXPOSE 3000


CMD ["node", "./dist/main.js"]