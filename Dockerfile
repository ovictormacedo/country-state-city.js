FROM node:15.11.0-alpine3.10

WORKDIR /var/cep

COPY ./src /var/cep

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]