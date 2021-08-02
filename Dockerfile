FROM node:15.11.0-alpine3.10

WORKDIR /var/cep/src

COPY . /var/cep

RUN cp /var/cep/.env-production /var/cep/src/.env 

EXPOSE 3000

RUN npm install

CMD [ "node", "app.js" ]