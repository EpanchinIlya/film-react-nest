FROM nginx:alpine

# Удаляем стандартную конфигурацию Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем вашу конфигурацию Nginx в контейнер
COPY nginx.conf /etc/nginx/nginx.conf


# VOLUME ["/usr/share/nginx/html"]
RUN apk add --no-cache mc

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]