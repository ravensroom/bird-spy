FROM node:20-alpine

WORKDIR /usr/src/bird-spy

COPY package*.json ./

RUN npm install
#RUN npm install -g pm2

COPY . ./

# EXPOSE 3000

CMD npm start