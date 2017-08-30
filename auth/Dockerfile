FROM bitnami/node:8.1.2-r0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3001
CMD [ "npm", "start" ]
