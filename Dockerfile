FROM node:15.11.0-alpine3.10
WORKDIR /var/www/cep/src
COPY . /var/cep
RUN cp -R /var/cep/src /var/www/cep
RUN mv .env-production .env
RUN npm install
EXPOSE 80
CMD ["node", "app.js"]