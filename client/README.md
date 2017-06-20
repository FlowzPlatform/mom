# TODO-Vuejs

> TODO-Vuejs is a task based application in Vuejs as a frontend. End user can create upto N level parent/child task. It stores data in rethinkdb via feathres API. Created feathers API for the real-time data.

## Getting started 
1. Take clone of project from below mentioned git url. 

    git@172.16.699.216:uhirani/todo-vue-dynamic-component.git

2. Install rethinkdb.
    https://rethinkdb.com/docs/install/
    
    before run application 
    
    > start rethinkdb

3. Run feathres server

   > Install your dependencies

     ```
   > cd path/to/server; npm install
     ```

   > Start server

   > npm start or node src

4. Start your app

   node server.js


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
