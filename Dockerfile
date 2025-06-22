FROM node:22.6.0

WORKDIR /app

COPY package.json /app

COPY ormconfig.js /app

RUN npm install

COPY . /app

RUN npm run build
CMD npm run typeorm migration:run && npm run start
