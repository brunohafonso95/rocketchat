FROM tarampampam/node:alpine

RUN mkdir /app
WORKDIR /app

ADD package.json /app
RUN npm install

ADD . /app

EXPOSE 80
ENTRYPOINT bin/hubot -a rocketchat