FROM node:16-alpine

WORKDIR /app

ADD . /app

RUN npm install

CMD ["npm", "start"]
