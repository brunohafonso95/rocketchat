FROM tarampampam/node:alpine

RUN mkdir /app
WORKDIR /app

ADD package.json /app
RUN npm install

ADD . /app
RUN chmod +x /app/bin/hubot

EXPOSE 5000
ENTRYPOINT bin/hubot -a rocketchat