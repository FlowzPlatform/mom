# MOM

> MOM is a task based application in Vuejs as a frontend. End user can create upto N level parent/child task. It stores data in rethinkdb via feathres API. Created feathers API for the real-time data.

## Getting started

1. Take clone of project

2. Install rethinkdb.

    https://rethinkdb.com/docs/install/

    before run application

    > start rethinkdb

3. Install mongodb.

    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

    before run application

    > start mongodb

4. Run Microjs of auth

    Install your dependencies

    > cd path/to/auth/folder

    > npm install

    Run below command to setup SECRET and Mongodb path and run auth service

    > SECRET=abcdefgabcdefg MONGODB=mongodb://localhost:27017 npm start

5. Run Microjs of USER

    Install your dependencies

    > cd path/to/user/folder;

    > npm install

    Run below command to setup SECRET and Mongodb path and run auth service

    > SECRET=abcdefgabcdefg MONGODB=mongodb://localhost:27017 npm start

6. Run feathres server

    Install your dependencies

    > cd path/to/server;

    > npm install

    Start server

    > npm start or node src

7. Run client

    Install your dependencies

    > cd path/to/client; npm install

    Start client

    > npm start or npm run dev

## Getting started using docker

1. Install docker and docker compose

    >  https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04

    >  https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04

2. Run application

    > docker-compose up
