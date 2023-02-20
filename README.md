# stackoverflow_lite

stackoverflow_lite is a platform where users can ask and answer questions as well as vote on most relevant/useful answers. 

this api was built using nodejs/express, mysql/sequelize, chai/mocha for testing and es-lint.

# installation
- clone this repo
  ```node
  git clone https://github.com/toluflw/stackoverflow_lite.git
  ```
- install package.json
  ```node
  npm install
  ```
- setup env vars, you can use the `.env.example` file as a guide for required vars.
  
- run db migrations
  ```node
  sequelize db:migrate
  ```
- run the application
  ```node
  npm run devStart (the dev environment start script uses nodemon)
  ```
  
# testing
- you can run the test suites for this app (ensure to provision a test db)
  ```node
  npm run test
  ``` 
  
# live demo
  https://stackoverflowlite-flw.herokuapp.com
  
# docs
the base url is `/api/v1`and the main endpoints are:

- `/users`

- `/posts`

- `/posts/answers`

- `/posts/answers/comments`

- `/posts/answers/votes`

## users
## register user
new user registration. returns success message and new user username and creation date.
### request
` POST /users `
```curlrc
curl --location --request POST 'https://stackoverflowlite-flw.herokuapp.com/api/v1/users' \
--data-raw '{
    "username": "tolusolaadeyemi",
    "password": "blackberry"
}'
```
### response
```json
{
    "success": true,
    "code": 201,
    "message": "user succesfully registered",
    "data": {
        "user": {
            "username": "tolusolaadeyemi",
            "created_at": "2022-09-30T08:14:05.478Z"
        }
    }
}
```

## user login
logs a valid user in. returns success message, username and token.
### request
` POST /users `
```curlrc
curl --location --request POST 'https://stackoverflowlite-flw.herokuapp.com/api/v1/users/login' \
--data-raw '{
    "username": "tolusolaadeyemi",
    "password": "blackberry"
}'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "user logged in",
    "data": {
        "username": "narcissamalfoy",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY2NDUyNTcyNywiZXhwIjoxNjY3MTE3NzI3fQ.gM9YdQlOjYr-OP5rQaTv03sEMPHnq"
    }
}
```

## questions
## user can ask a question
lets a valid/authenticated user ask a question. returns success message as well as the question title and body. authorization header (token) required
### request
` POST /posts `
```curlrc
curl --location --request POST 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY2NDUyNTU5NiwiZXhwIjoxNjY3MTE3NTk2fQ.m10luC97CrYgA16xALx_a' \
--data-raw '{
    "title": "how to deploy react app to heroku",
    "body": "I have a reactjs app with next and I am having issues deploying to heroku, can anyone help?"
}'
```
### response
```json
{
    "success": true,
    "code": 201,
    "message": "post created",
    "data": "how to deploy nodejs app to heroku"
}
```
## user can fetch all questions
lets a user fetch all questions. returns success message as well as the data.
### request
` GET /posts `
```curlrc
curl --location --request GET 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "success",
    "data": [
        {
            "uuid": "d4b5eca5-a10b-4797-86a0-5abdc0128876",
            "title": "how to deploy nodejs app to heroku",
            "body": "I have a nodejs app with sequelize and I am having issues deploying to heroku, can anyone help?",
            "username": "narcissamalfoy",
            "createdAt": "2022-09-30T08:18:39.000Z",
            "updatedAt": "2022-09-30T08:18:39.000Z"
        },
        {
            "uuid": "5f87ec85-355a-4664-84a8-3a66201fb80f",
            "title": "shows posts of only the logged in user",
            "body": "I made a route to get posts of the logged in user but right now I'm getting posts of all the user when I call the api for this route. what shall I change here?",
            "username": "luciusmalfoy",
            "createdAt": "2022-09-29T11:02:30.000Z",
            "updatedAt": "2022-09-29T11:02:30.000Z"
        },
        {
            "uuid": "5bdef607-beec-4548-a2cb-7f5628c5fbe2",
            "title": "NodeJs Environment variables vs config file",
            "body": "Actually I have a nodejs express app with its config file for params like host, port, JWT token, DB params and more.",
            "username": "luciusmalfoy",
            "createdAt": "2022-09-28T12:45:10.000Z",
            "updatedAt": "2022-09-28T12:45:10.000Z"
        },
        {
            "uuid": "de87966b-1ff9-4dbf-a3ce-f56eddb1247b",
            "title": "How to update a record using sequelize for node?",
            "body": "Im creating a RESTful API with NodeJS, express, express-resource, and Sequelize that is used to manage datasets stored in a MySQL database. Im trying to figure out how to properly update a record using Sequelize.",
            "username": "janecrocket",
            "createdAt": "2022-09-26T21:37:26.000Z",
            "updatedAt": "2022-09-26T21:37:26.000Z"
        },
        {
            "uuid": "953abef4-e99c-41a5-ab0b-bbce3a619f75",
            "title": "Node wait for async function before continue",
            "body": "I have a node application that use some async functions. How can i do for waiting the asynchronous function to complete before proceeding with the rest of the application flow?",
            "username": "pambeesley",
            "createdAt": "2022-09-25T11:01:59.000Z",
            "updatedAt": "2022-09-25T11:01:59.000Z"
        },
        {
            "uuid": "459f504d-1606-4934-8c19-6f078cb5c8e3",
            "title": "Using Node.JS, how do I read a JSON file into (server) memory?",
            "body": "How do I read a JSON object out of a text or js file and into server memory using JavaScript/Node?",
            "username": "toluwanimi",
            "createdAt": "2022-09-24T20:02:00.000Z",
            "updatedAt": "2022-09-24T20:02:00.000Z"
        },
        {
            "uuid": "12934b00-aaf4-4cc7-9cbb-03bcacc233c7",
            "title": "Setting Environment Variables for Node to retrieve",
            "body": "Based on some Googling, it appears that I need to set the variables in process.env? How and where do I set these credentials? Example Please.",
            "username": "toluwanimi",
            "createdAt": "2022-09-24T19:57:44.000Z",
            "updatedAt": "2022-09-24T19:57:44.000Z"
        },
        {
            "uuid": "ae68b545-05db-4f53-b195-99e38fa6abf6",
            "title": "center a div in css",
            "body": "i'm trying to center the newsslider (in the div bottom-container) on my webpage. i already have text-align: center; Still it does not work. Any suggestions?",
            "username": "toluwanimi",
            "createdAt": "2022-09-24T19:54:10.000Z",
            "updatedAt": "2022-09-24T19:54:10.000Z"
        }
    ]
}
```

## user can fetch a single question
lets a user fetch a single question. returns success message as well as the data.
### request
` GET /posts/:id `
```curlrc
curl --location --request GET 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/5'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "success",
    "data": {
        "uuid": "953abef4-e99c-41a5-ab0b-bbce3a619f75",
        "username": "pambeesley",
        "title": "Node wait for async function before continue",
        "body": "I have a node application that use some async functions. How can i do for waiting the asynchronous function to complete before proceeding with the rest of the application flow?",
        "createdAt": "2022-09-25T11:01:59.000Z",
        "updatedAt": "2022-09-25T11:01:59.000Z",
        "answer_count": 2
    }
}
```
## user can delete their own question
lets an authenticated user delete their own question; authorization header required. returns success message (or error if post does not belong to user)
### request
` DELETE /posts/:id `
```curlrc
curl --location --request DELETE 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/21' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY2NDUyNzk1NiwiZXhwIjoxNjY3MTE5OTU2fQ.Z2QM8cxR56j3'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "post deleted",
    "data": null
}
```

## user can fetch all their own questions
lets a user fetch all their own questions. returns success message and the data.
### request
` GET /posts/users/:id `
```curlrc
curl --location --request GET 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/users/37'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "success",
    "data": [
        {
            "uuid": "5f87ec85-355a-4664-84a8-3a66201fb80f",
            "title": "shows posts of only the logged in user",
            "body": "I made a route to get posts of the logged in user but right now I'm getting posts of all the user when I call the api for this route. what shall I change here?",
            "username": "luciusmalfoy",
            "createdAt": "2022-09-29T11:02:30.000Z",
            "updatedAt": "2022-09-29T11:02:30.000Z"
        },
        {
            "uuid": "5bdef607-beec-4548-a2cb-7f5628c5fbe2",
            "title": "NodeJs Environment variables vs config file",
            "body": "Actually I have a nodejs express app with its config file for params like host, port, JWT token, DB params and more.",
            "username": "luciusmalfoy",
            "createdAt": "2022-09-28T12:45:10.000Z",
            "updatedAt": "2022-09-28T12:45:10.000Z"
        }
    ]
}
```

## user can fetch question with the highest number of answers
lets a user fetch the question with the highest number of answers. returns success message and the data.
### request
` GET /posts/highest/answers `
```curlrc
curl --location --request GET 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/highest/answers'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "success",
    "data": {
        "questionWithMostAnswers": {
            "id": 5,
            "answers": 2,
            "username": "pambeesley",
            "title": "Node wait for async function before continue",
            "body": "I have a node application that use some async functions. How can i do for waiting the asynchronous function to complete before proceeding with the rest of the application flow?",
            "createdAt": "2022-09-25T11:01:59.000Z",
            "getAnswersMap": [
                {
                    "username": "toluwanimi",
                    "body": "Yes, promises and async/await (syntax sugar) are the way to go",
                    "status": "accepted",
                    "createdAt": "2022-09-25T19:53:26.000Z"
                },
                {
                    "username": "jimhalpert",
                    "body": "One possible solution to this problem is to code re-actively , telling your program what to do when the calculation completed.",
                    "status": "rejected",
                    "createdAt": "2022-09-25T20:07:53.000Z"
                }
            ]
        }
    }
}
```

## user can search for a specific question
lets a user search for a question through query params (q). returns success message as the data.
### request
` GET /posts/post/search`
```curlrc
curl --location --request GET 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/post/search?q=async'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "success",
    "data": [
        {
            "uuid": "953abef4-e99c-41a5-ab0b-bbce3a619f75",
            "title": "Node wait for async function before continue",
            "body": "I have a node application that use some async functions. How can i do for waiting the asynchronous function to complete before proceeding with the rest of the application flow?",
            "createdAt": "2022-09-25T11:01:59.000Z",
            "updatedAt": "2022-09-25T11:01:59.000Z"
        }
    ]
}
```

## answers
## user can answer a question
lets a valid/authenticated user answer a question. returns success message as well as the answer body. authorization header (token) required
### request
` POST /posts/answers/:id `
```curlrc
curl --location --request POST 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/answers/17' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImlhdCI6MTY2NDUyNzk1NiwiZXhwIjoxNjY3MTE5OTU2fQ.Z2QM8cxR56j3SX6cohLFuMcecL4kC4Y5IILW' \
--data-raw '
{
    "body":"you can try to use filters here."

}'
```
### response
```json
{
    "success": true,
    "code": 201,
    "message": "answer added",
    "data": "you can try to use filters here."
}
```

## user can fetch all answers to a question
lets a user fetch all answers to a specific question. returns success message as well as the data.
### request
` GET /posts/answers/:id `
```curlrc
curl --location --request GET 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/answers/5'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "success",
    "data": {
        "answers": {
            "0": {
                "id": 1,
                "uuid": "4bfabe15-bfad-4b9d-9061-a8e01bbaa27b",
                "questionId": 5,
                "body": "Yes, promises and async/await (syntax sugar) are the way to go",
                "createdAt": "2022-09-25T19:53:26.000Z",
                "status": "accepted",
                "username": "toluwanimi"
            },
            "1": {
                "id": 2,
                "uuid": "4f181424-1651-44ed-90e8-e86f13626145",
                "questionId": 5,
                "body": "One possible solution to this problem is to code re-actively , telling your program what to do when the calculation completed.",
                "createdAt": "2022-09-25T20:07:53.000Z",
                "status": "rejected",
                "username": "jimhalpert"
            },
            "upvotes": 2,
            "downvotes": 0,
            "comment_count": 2
        }
    }
}
```


## user can accept answer to their own question
lets a user accept an answer to their own question (auth header required). returns success message.
### request
` PUT /posts/answers/accept/:id `
```curlrc
curl --location --request PUT 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/answers/accept/3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjY0NTMyNjg4LCJleHAiOjE2NjcxMjQ2ODh9.jfZwfzbcxT5EdwA_ZK3vcSFXhM'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "answer accepted",
    "data": true
}
```
## user can upvote/downvote an answer
lets an authenticated user vote on an answer (auth header required). returns success message as well as vote_type.
### request
` POST /posts/answers/votes/:id `
```curlrc
curl --location --request POST 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/answers/votes/15' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjY0NTMyNjg4LCJleHAiOjE2NjcxMjQ2ODh9.jfZwfz4ou7YpTO1FXhM' \
--data-raw '{
    "vote_type":"up"
}'
```
### response
```json
{
    "success": true,
    "code": 201,
    "message": "your vote was recorded",
    "data": "you gave this answer a/an up vote"
}
```

## comments
## user can comment on an answer
lets a valid/authenticated user comment on an answer. returns success message as well as the comment body. authorization header (token) required
### request
` POST /posts/answers/comments/:id`
```curlrc
curl --location --request POST 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/answers/comments/15' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjY0NTMyNjgDh9.jfZwfzbcxT5EdwA_ZK3vcS0TK3tGuo4ou7YpTO1FXhM' \
--data-raw '{
    "body":"remember to require your dotenv.config to use process.env if not your variables won'\''t load"
}'
```
### response
```json
{
    "success": true,
    "code": 201,
    "message": "comment added",
    "data": "remember to require your dotenv.config to use process.env if not your variables won't load"
}
```

## user can fetch all comments on an answer
lets a user fetch all comments on an answer. returns success message as well as the data
### request
` GET /posts/answers/comments/:id`
```curlrc
curl --location --request GET 'https://stackoverflowlite-flw.herokuapp.com/api/v1/posts/answers/comments/1'
```
### response
```json
{
    "success": true,
    "code": 200,
    "message": "success",
    "data": [
        {
            "uuid": "35b9beec-958f-4a4a-a3e1-cc391a4db872",
            "answerId": 1,
            "body": "wow I always have serious issues when trying to use async await",
            "createdAt": "2022-09-29T19:54:37.000Z",
            "username": "toluwanimi"
        },
        {
            "uuid": "317444ee-76f7-4023-8da9-cd726acea23c",
            "answerId": 1,
            "body": "is there any difference between promises and async/await",
            "createdAt": "2022-09-29T19:54:56.000Z",
            "username": "toluwanimi"
        }
    ]
}
```


