# Notebook

##### Notes taking app, developed using Nestjs, GraphQL, Prisma, Docker ReactJS, Apollo/Client

## backend stack

⋅⋅* NestJS
⋅⋅* GraphQL
⋅⋅* Passport
⋅⋅* graphql-subscriptions

fatures:
authentication using passport/jwt i.e. access_token & refresh_token
realtime notes update

#### login mutation

```
  mutation login($input: loginInput!){
  login(loginInput:$input){
    id
    fullname
    email
    access_token
    refresh_token
  }
}

QUERY VARIABLES

{
  "input":{
    "email":"newyork@city.ae",
    "password":"123456"
  }
}

```

#### create note subscription

```
subscription{
  noteCreated{
    id
    title
    content
  }
}

HTTP HEADERS

{
  "Authorization":"Bearer access_token"
}
```

more info ... CS

## frontend stack

    ⋅⋅* RaectJS
    ⋅⋅* GraphQL
    ⋅⋅* Typescript
    ⋅⋅* Apollo/Client

![SignUp](screenshots/signup.png?raw=true "Sign Up")
![Login](screenshots/login.png?raw=true "Login")
![Note Action Popup](screenshots/note-action.png?raw=true "Action popup")
![Logout Popup](screenshots/logout.png?raw=true "Logout Popup")
