# Todo List API

## Overview
A todo list backend built in Node with MongoDB and Express, features user authentication, todolist creation, and todo item actions.

## Endpoints

### Authentication
```http
POST /auth/signup
```
Creates a user with given username and password, on success will return a 201 status and a JWT cookie
```json
{
  "username": "test",
  "password": "123"
}
```
```http
201 CREATED
```
```http
POST /auth/login
```
Logs user in if valid credentials are given, on success will return 200 and a JWT cookie
```json
{
  "username": "test",
  "password": "123"  
}
```
```http
200 OK
```
```http
GET /auth/logout
```
Logs user out by removing the JWT cookie from header, returns 200 on success
```http
200 OK
```


### Tasklists

Requires user to be logged in
Task list properties
```javascript
{
  title: String,
  description: String,
  tasks: []Tasks,
  creator: User,
  public: Boolean,
  created_on: Date
}
```
