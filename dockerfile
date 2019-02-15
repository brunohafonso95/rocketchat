FROM tarampampam/node:alpine

RUN mkdir /app
WORKDIR /app

ADD package.json /app
RUN npm install

ADD . /app
RUN chmod +x /app/bin/hubot
RUN npm config set proxy http://proxylatam.indra.es:8080
RUN npm config set https-proxy http://proxylatam.indra.es:8080
RUN npm config set http-proxy http://proxylatam.indra.es:8080

EXPOSE 5000
ENTRYPOINT bin/hubot -a rocketchat