FROM node:alpine
MAINTAINER flowz <dm@officebrain.com>



RUN mkdir -p /opt/app

#working directory
WORKDIR /opt/app
ADD . /opt/app
RUN npm install
RUN npm install --save jquery

EXPOSE 3000

CMD npm start
