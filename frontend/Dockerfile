FROM node:20

WORKDIR /frontend/

COPY package.json yarn.lock .

RUN npm start

COPY . .

CMD npm start