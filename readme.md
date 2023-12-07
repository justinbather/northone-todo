# Todo List API

## Overview
A todo list backend built in Node with MongoDB and Express, features user authentication, todolist creation, and todo item actions.

## Usage

### DB Setup

This API uses MongoDb. To start a server follow the steps to create a cluster in Atlas or setup a local server instance

Create a .env file in the project root directory and copy the value names from .env.sample, and add your values.

Verify the server starts using `npm run dev` and ensure you see the log showing MongoDB Connected

### Seeding

You can populate the connected DB by running `npm run seed`

This deletes all created users, tasks, and tasklists before creating a user, a task list, and 100 tasks.

You can use this user to login with the credentials:
username: test
password: 123

### Tests

There are tests created for auth, tasklist, tasks, and permissions functionality

This uses a mongo in memory server to test all aformentioned functionality including, creating a user and testing permissions with an in memory JWT token

To run tests, run `npm run test`

### Manual testing

To checkout the endpoints use an http test software eg. postman
 
First login following the login instructions below and play around with the seeded data.

If you do something you wish to undo, just re run `npm run seed` and you'll have a fresh set of data


## Endpoints

Below are all listed endpoints with the request and response information and descriptions.

### Authentication

Users Can signup, login, and logout. Authentication is done using JWT, stored in a cookie

User Interface
```javascript
{
  username: String,
  password: String,
}
```
Signup:
Creates a user with given username and password, on success will return a 201 status and a JWT cookie
```http
POST /auth/signup
```
Request
```json
{
  "username": "test",
  "password": "123"
}
```
Response
```http
201 CREATED
```
Login:
Logs user in if valid credentials are given, on success will return 200 and a JWT cookie
```http
POST /auth/login
```

Request
```json
{
  "username": "test",
  "password": "123"  
}
```
Response
```http
200 OK
```
Logout:
Logs user out by removing the JWT cookie from header, returns 200 on success

Request
```http
GET /auth/logout
```

Response
```http
200 OK
```


### Tasklists

Users can create a tasklist, and add tasks to it. The task list can be made public or private through the `public` property (defaults to true)

Requires user to be logged in

Task list properties

Interface
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

Create Task List
Creates a task list with given information, returns 201 and the created tasklist
Request
```http
POST /Tasklists
```
```json
{
  "title": "test title",
  "description": "test description",
  "public": true
}
```
Response
```http
201 CREATED
```
```json
{
  "_id": "ObjectId(123445)",
  "title": "test title",
  "description": "test description",
  "public": true,
  "tasks": [],
  "creator": "ObjectId(23124148)", //User id
  "created_on": "2024-01-01"
}
```

Get task list (all)
Returns an array of tasklists found. Will only search for tasklists created by user or are public.

Request
```http
GET /tasklists
```

Response:
```http
200 OK
```
```json
[
  {
    "_id": "ObjectId(123445)",
    "title": "test title",
    "description": "test description",
    "public": true,
    "tasks": [],
    "creator": "ObjectId(23124148)", //User id
    "created_on": "2024-01-01"
  },

]
```

Get task list by id
Returns found tasklist object on success. Will only return if tasklist is created by the user or is public

Request
```http
GET /tasklists/123445
```

Response
```http
200 OK
```
```json
{
  "_id": "ObjectId(123445)",
  "title": "test title",
  "description": "test description",
  "public": true,
  "tasks": [],
  "creator": "ObjectId(23124148)", //User id
  "created_on": "2024-01-01" 
}
```

Update Task List
Returns updated task list. Can only update task list if the user is the creator.
Only need to send the properties to be changed.

Request
```http
PATCH /tasklists/123445
```
```json
{
  "title": "new test title"
}
```

Response
```http
200 OK
```
```json
{
  "_id": "ObjectId(123445)",
  "title": "new test title",
  "description": "test description",
  "public": true,
  "tasks": [],
  "creator": "ObjectId(23124148)", //User id
  "created_on": "2024-01-01" 
}
```

Delete Task List
Returns 204 No content upon success. Can only delete a task list if user is the creator

Request
```http
DELETE /tasklists/123445
```

Response
```http
204 NO CONTENT
```

### Tasks

Users once logged in can create a task in their task lists, update them, and delete them. Users can add any amount of subtasks to a task aswell.
Users can only modify (create, update, delete) tasks if they created the task list

Login is required

Interface
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  task_list: TaskList,
  status: {
    type: String,
    enum: ["Incomplete", "Complete", "Overdue"],
    default: "Incomplete"
  },
  importance: {
    type: String,
    enum: ['Not Important', 'Slightly Important', 'Important', 'Very Important', 'Critical'],
    default: "Important"
  },
  due_date: Date,
  sub_tasks: []Tasks,
  parent_task: Task,
}
```
Create a task

Request
```http
POST /tasklists/:taskListId/tasks
```
```json
{
  "title": "test task",
  "description": "my test task",
  "status": "Incomplete",
  "importance": "Urgent",
  "due_date" : "2024-01-01"
}
```

Response
```http
201 CREATED
```
```json
{
  "_id": "objectId(123)",
  "title": "test task",
  "description": "my test task",
  "status": "Incomplete",
  "sub_tasks": [],
  "task_list": "objectId(123445)",
  "importance": "Urgent",
  "due_date" : "2024-01-01"
}
```

Create a subtask

Request
```http
POST /tasklists/:taskListId/tasks/123/subtasks
```
```json
{
  "_id": "objectId(999)",
  "title": "test subtask",
  "description": "my test subtask",
  "status": "Incomplete",
  "sub_tasks": [],
  "task_list": "objectId(123445)",
  "importance": "Urgent",
  "due_date" : "2024-01-01"
}
```
Response
```http
201 CREATED
```
```json
{
  "_id": "objectId(999)",
  "title": "test subtask",
  "description": "my test subtask",
  "status": "Incomplete",
  "sub_tasks": [],
  "task_list": "objectId(123445)",
  "parent_task": "objectId(123)", //This now references the task we gave in the url params
  "importance": "Urgent",
  "due_date" : "2024-01-01"
}
```

Get tasks (all tasks in task list)
Will return all tasks in a given task list if the user created the task list or the task list is public.

```http
GET /tasklists/:taskListId/tasks
```

A user can also utilize some filter, sort, and search options.
Search can only be done by title currently.

These options can be used as listed here:
The queries can be chained or not, as long as each is seperated by an `&` and seperated from the base endpoint with `?`

Sort_by can be sorted in descending order using a `-` eg: `sort_by=-status` or ascending, just emitting the minus sign, eg: `sort_by=status`

Sort_by options:
- status
- importance
- title
- _id
- due_date

Filter can be used by selecting the property you want to filter and what value, eg: `importance=Important`

Filter options:
- Importance
- Status

```http
GET /tasklists/:taskListId/tasks?search=foobar&sort_by=status&importance=Important
```
Response
```http
200 OK
```
```json
[{
  "_id": "objectId(123)",
  "title": "test task",
  "description": "my test task",
  "status": "Incomplete",
  "sub_tasks": [{ // We can see the sub task here
      "_id": "objectId(999)",
      "title": "test subtask",
      "description": "my test subtask",
      "status": "Incomplete",
      "sub_tasks": [],
      "task_list": "objectId(123445)",
      "parent_task": "objectId(123)", 
      "importance": "Urgent",
      "due_date" : "2024-01-01"
    }],
  "task_list": "objectId(123445)",
  "importance": "Urgent",
  "due_date" : "2024-01-01"
},
{ 
  "_id": "objectId(999)",
  "title": "test subtask",
  "description": "my test subtask",
  "status": "Incomplete",
  "sub_tasks": [],
  "task_list": "objectId(123445)",
  "parent_task": "objectId(123)", 
  "importance": "Urgent",
  "due_date" : "2024-01-01"
  
}]
```

Get task by id
Fetches task given the id in url params. Will return the task object if user created it or the tasklist is public.

Request
```http
GET /tasklists/:taskListId/tasks/123
```

Response
```http
200 OK
```
```json
{
  "_id": "objectId(123)",
  "title": "test task",
  "description": "my test task",
  "status": "Incomplete",
  "sub_tasks": [{ // We can see the sub task here
      "_id": "objectId(999)",
      "title": "test subtask",
      "description": "my test subtask",
      "status": "Incomplete",
      "sub_tasks": [],
      "task_list": "objectId(123445)",
      "parent_task": "objectId(123)", 
      "importance": "Urgent",
      "due_date" : "2024-01-01"
    }],
  "task_list": "objectId(123445)",
  "importance": "Urgent",
  "due_date" : "2024-01-01"
}
```

Update Task

Updates selected task from url params if user created it.
Returns updated task on success

Request
```http
PATCH /tasklists/:taskListId/tasks/123
```
```json
{
  "status": "Complete"
}
```

Response
```http
200 OK
```
```json 
{
  "_id": "objectId(123)",
  "title": "test task",
  "description": "my test task",
  "status": "Complete",
  "sub_tasks": [{ // We can see the sub task here
      "_id": "objectId(999)",
      "title": "test subtask",
      "description": "my test subtask",
      "status": "Incomplete",
      "sub_tasks": [],
      "task_list": "objectId(123445)",
      "parent_task": "objectId(123)", 
      "importance": "Urgent",
      "due_date" : "2024-01-01"
    }],
  "task_list": "objectId(123445)",
  "importance": "Urgent",
  "due_date" : "2024-01-01"
}
```

Delete task

Deletes selected task from url params if user created it
If the task to be deleted has sub tasks, all sub tasks will also be deleted.
If the task is a sub task of another, all references to the deleted task will also be removed from the parent_task
Returns 204 No Content

Request
```http
DELETE /tasklists/:taskListID/tasks/999
```

Response
```http
204 NO CONTENT
```
