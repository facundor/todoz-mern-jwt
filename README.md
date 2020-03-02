# Intro
This is a proof of concept of MERN stack, JWT authentication and Docker delivery, among other things. The idea is to use this stack to achieve:
- at the server side: a simple, scalable and secure REST API.
- at the client side: a responsive material-design single-page web application.

Off course, you can use this as a boilerplate project.

# How to run
For a release execution:
```
  git clone https://github.com/jbaris/todoz-mern-jwt.git todoz
  cd todoz
  npm run deploy:release
```
For a development execution (hot-reload enabled):
```
  git clone https://github.com/jbaris/todoz-mern-jwt.git todoz
  cd todoz
  npm run deploy:develop
```

# How to test
Open in your browser at:
- http://localhost : the application (http://localhost:3000 for development execution, with hot-reload)
- http://localhost:5000/api-docs : the server API documentation

# Stack
- MERN ([MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [ReactJS](https://reactjs.org/), [Node](https://nodejs.org/en/))
- JWT authentication (with [express-jwt](https://github.com/auth0/express-jwt#readme) and [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme))
- [material-ui](https://material-ui.com/) for UI skeleton (based on [templates](https://material-ui.com/getting-started/templates/#react-templates))
- [material-table](https://material-table.com) for todo list table
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme) to hash passwords
- [morgan](https://github.com/expressjs/morgan#readme) to log http requests
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc#swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express#swagger-ui-express) for Swagger UI documentation ([OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md))
- [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/) for packaging and delivery
- [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library#readme) for unit tests
- [moxios](https://github.com/axios/moxios#readme) for http requests mocking
- [SuperTest](https://github.com/visionmedia/supertest#readme) for http requests testing
- [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server#readme) for mongodb database mocking

# Screenshots

SignIn

![SignIn](https://raw.githubusercontent.com/jbaris/site-images/master/todoz-mern-jwt/login.png)

SignUp

![SignUp](https://raw.githubusercontent.com/jbaris/site-images/master/todoz-mern-jwt/signup.png)

Home

![Home](https://raw.githubusercontent.com/jbaris/site-images/master/todoz-mern-jwt/todo-list.png)

Server API documentation

![ServerAPI](https://raw.githubusercontent.com/jbaris/site-images/master/todoz-mern-jwt/server-api-doc.png)

# Roadmap
- [x] JWT token renew.
- [x] Improve properties management, based on environments (consider running from docker services).
- [x] Add Swagger for API documentation.
- [x] Improve docker-compose to allow hotreload for development.
- [ ] Unit and integration tests.
- [ ] Improve UI error messages.
- [ ] Improve overall UI design.
- [ ] Migrate to TypeScript?

# License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
