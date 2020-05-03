FROM node:11-alpine

WORKDIR /desafio-bexs

COPY package*.json ./
RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 9000

CMD nodemon -L --watch . ./server/index.js