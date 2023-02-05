# Notebook (Notes taking app)

Developed using Nestjs, GraphQL, Prisma, Docker, ReactJS, Apollo/Client.

## Backend

#### Stack:

- NestJS
- GraphQL
- Passport
- graphql-subscriptions
- Prisma
- Docker
- Postgresql

##### features:

1. Jwt authentication/authorization
2. _CRUD_ Note
3. realtime update using graphql-subscriptions
4. refresh token
5. **_subscriptions-transport-ws_** authentication
6. **_graphql-ws_** authentication

### Steps to run backend

- `npm run docker:up` (in case you don't want to use docker, then please replace the `DATABASE_URL` in server/.env)
- `npm install`
- `npm run start:dev`

#### DB Data Visualize

`npx prisma studio`

![DB Visualize](screenshots/prisma.gif?raw=true "Prisma DB Visualize")

#### Realtime Data using GraphQL-Subscription

![Realtime Data](screenshots/subscriptions.gif?raw=true "GraphQL Realtime Data")

## Frontend Stack

- ReactJS
- GraphQL
- Typescript
- Apollo/Client

### Steps to run frontend

- `npm install`
- `npm start`

> Signup

![SignUp](screenshots/signup.png?raw=true "Sign Up")

> Login

![Login](screenshots/login.png?raw=true "Login")

> Note Action Popup

![Note Action Popup](screenshots/note-action.png?raw=true "Action popup")

> Logout Popup

![Logout Popup](screenshots/logout.png?raw=true "Logout Popup")
