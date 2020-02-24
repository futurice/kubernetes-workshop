FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . /usr/src/app

CMD [ "node", "server.js" ]
