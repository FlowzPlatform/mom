#FROM node:6.11.0-slim
FROM node:8.1.2
MAINTAINER flowz <dm@officebrain.com>
ADD . /usr/src/app/server

WORKDIR /usr/src/app/server

RUN npm install


EXPOSE 3030

CMD NODE_ENV=production npm start
