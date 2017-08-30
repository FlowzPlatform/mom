FROM bitnami/node:8.1.2-r0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3002
#ENV MONGODB=mongodb://localhost:27017
#ENV SECRET=abcdefgabcdefg

CMD [ "npm", "start" ]
