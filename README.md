## Description

  Ini adalah API sederhana yang dibangun dengan nodeJs (nestJS)

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Routes
---- /artikels -----
```
to get all artikels (without login/ authorization) - /artikels - GET
```
to get artikels of the user was login - /artikels/my - GET
to get artikels by id (without login/ authorization) - artikels/id/:id -GET
to get artikels with filter (content, status, title) - artikels/?keyword=(content/status/title) - GET
to create artikels (you must login) - /artikels - POST
to Update artikels (you must login) - /artikels/:id - PATCH
to delete artikels (you must login) - /artikels/:id - DELETE

---- /auth ----
to create account (require username, email, password) - /auth/signup - POST
to signin (require email and password) - /auth/signin - POST
