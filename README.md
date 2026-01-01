# Todo API

Simple REST API for managing a Todo list, built with **Node.js**, **Express**, and **PostgreSQL**.

## Tech Stack

- Node.js  
- Express  
- PostgreSQL  
- pg  
- dotenv  

## Setup

### Install dependencies
```bash
npm install
```

Run the server

```bash
npm start
```

Server will run at:
```bash
http://localhost:3000
```

### API Endpoints

Get all todos

```bash
GET /todos
```
Get todo by id

```bash
GET /todos/:id
```
Create todo

```bash
POST /todos
```

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn REST APIs"}'
```
Update todo

```bash
PUT /todos/:id
```

```bash
{
  "title": "Updated title",
  "completed": false
}
```
Complete todo

```bash
PATCH /todos/:id/complete
```

Delete todo

```bash
DELETE /todos/:id
```

### Environment variables (.env)

```bash

PORT=3000
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=todo_project
PG_PASSWORD=your_password
PG_PORT=5432

```

### Database

```bash

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP
);

```