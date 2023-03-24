FROM docker.io/node:lts-alpine

ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

WORKDIR /app

RUN npm install -g nx

COPY package*.json ./

RUN npm install

COPY . .

CMD ["nx", "run", "insights-client:serve:production  --host 0.0.0.0"]
