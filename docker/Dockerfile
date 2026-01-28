FROM nginx:alpine

ADD docker/nginx.conf /etc/nginx/conf.d/default.conf
ADD docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
COPY dist /usr/share/nginx/html
CMD ["sh","/docker-entrypoint.sh"]
