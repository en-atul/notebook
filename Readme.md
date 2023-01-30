# Notebook

- It's a note-taking app that is built using Nestjs, GraphQL

## backend stack

- NestJS
- GraphQL

fatures:
authentication using jwt i.e. access_token & refresh_token
realtime notes update

## login mutation
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

more info ... CS

## frontend stack

- RaectJS
- GraphQL
- Typescript

more info ... CS
