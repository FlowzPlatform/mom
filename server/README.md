# feathers-sample

> Sample project using feathers service, hooks and authentication

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathers-sample; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).

## Run Using Docker ##

1.start the RethinkDb server.
```
docker run --name todo-rethink -v "$PWD:/data" -p 8080:8080 -p 28015:28015 -d rethinkdb
```

2.start the server of the project.
```
docker run --name todo-server -p 3030:3030 --link todo-rethink:todo_db fl0wz/server_for_todo_app
```
go to browser and search
1. RethinkDb database on localhost:8080
2. Todo-server on localhost:3030
