FROM docker.io/node:lts-alpine

ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

WORKDIR /app

RUN npm install -g nx

COPY package*.json ./

RUN npm install

COPY . .

CMD ["nx", "serve", "insights-api"]
